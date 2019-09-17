import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import ScrollUpButton from "react-scroll-up-button";
import "../../components/style/cardStyle.css";
import ModalComponent from '../../modal/ModalComponent';
import { clearSuggestionList, loadMySuggestionsByScoreActionCreator, loadPagginatedMySuggestionsActionCreator } from "../../redux/actionCreators/infiniteSuggestionActionCreators";
import { changeSortType, deleteMySuggestionActionCreator, getTitlesMySuggestionsSearch, loadMySuggestionEnterActionCreator, loadSuggestionTitleSearch, sendUndoVoteActionCreator, sendVoteActionCreator } from '../../redux/actionCreators/suggestionActionCreators';
import CustomDropdown from '../dummyComponents/CustomDropdown';
import ESugestionStatus from '../ESugestionStatus';
import InfiniteSuggestions from '../InfiniteSuggestions';
import SearchPage from '../SearchPage';
import "../style/tableStyle.css";
import "./style/dropdown.css";

class MySuggestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            type: ESugestionStatus.MINE, 
        }
        localStorage.setItem("status",ESugestionStatus.MINE);
        this.getTitle = this.getTitle.bind(this);
        this.getEmptyTitle = this.getEmptyTitle.bind(this);
        this.getTitleEnter = this.getTitleEnter.bind(this);
        this.submit = this.submit.bind(this);
    }


    setModalStow = (b) => {
        this.setState({
            modalShow: b
        })
    }

    componentDidMount() {
        localStorage.setItem("status",ESugestionStatus.MINE);
        this.props.clearSuggestionsList();
    }

    updateComponentSearch() {
        this.setState(this.state);
        //schimbat
        this.props.loadSuggestionSearch(this.state.type);
    }

    getTitle = (title) => {
        //schimbat
        if(title)
        this.props.loadSuggestionSearch(title);
    }

    getTitleEnter = (title) => {
        //schimbat
        if(title)
        this.props.loadSuggestionEnter(this.props.user.id, title);
    }

    getEmptyTitle = (title) => {
        if (title.length === 0) {
            this.props.clearSuggestionsList();
            this.props.loadSuggestions(0, this.props.user.id);
        }
    }

    submit = (id) => {
        confirmAlert({
            id: id,
            title: 'Confirm delete',
            message: 'Are you sure to do delete this suggestion?',
            buttons: [
                {
                    label: 'No',
                    onClick: () => { }
                },
                {
                    label: 'Yes',
                    onClick: () => this.props.deleteSuggestion(id,this.props.user.id)
                },
                
            ]
        });
    };

    onClick = (event) => {
        event.preventDefault()
        const sortType = event.target.value === "true";
        this.props.sortChangeType(sortType)
        if (sortType) {
            this.props.clearSuggestionsList();
            this.props.sortDateSuggestion(0,this.props.user.id)
        }
        else {
            this.props.clearSuggestionsList();
            this.props.sortScoreSuggestion(0,this.props.user.id)
        }
    }

    render() {
        return (
            <Container fluid={true}>
                <Row style={{ marginBottom: "8px", marginTop: "5px" }}>
                    <div style={{ display: 'flex', justifyContent: 'center', float: 'left' }} >
                        <CustomDropdown className="create styled-select semi-square" onClick={this.onClick} />
                        <ScrollUpButton />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                        <ModalComponent reload={false} reloadMine={this.props.user.id}></ModalComponent>
                    </div>
                    <div style={{ marginLeft: "260px" }}>
                        <SearchPage getTitleEnter={this.getTitleEnter} getTitle={this.getTitle} getEmptyTitle={this.getEmptyTitle} type={this.state.type}></SearchPage>
                    </div>
                </Row>
                <Row>
                    {this.props.user && this.props.user.id &&
                        <div className="centered-table">
                            <InfiniteSuggestions status={ESugestionStatus.MINE} user={this.props.user} submit={this.submit}></InfiniteSuggestions>
                        </div>
                    }
                </Row>
            </Container>
        )
    }
}

const mapStatToProps = (state) => {
    return {
        suggestions: state.suggestionReducer.suggestionList,
        user: state.userReducer.user,
        voted: state.suggestionReducer.voted,
        score: state.suggestionReducer.score
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        loadTitles: (userId) => dispatch(getTitlesMySuggestionsSearch(userId)),
        loadSuggestions: (offset, userId) => dispatch(loadPagginatedMySuggestionsActionCreator(offset, userId)),
        loadSuggestionSearch: (title) => dispatch(loadSuggestionTitleSearch(title)),
        voting: (vote) => dispatch(sendVoteActionCreator(vote)),
        undoVoting: (vote) => dispatch(sendUndoVoteActionCreator(vote)),
        deleteSuggestion: (id,userId) => dispatch(deleteMySuggestionActionCreator(id,userId)),
        sortScoreSuggestion: (offset,userId) => dispatch(loadMySuggestionsByScoreActionCreator(offset, userId)),
        sortDateSuggestion: ( offset,userId) => dispatch(loadPagginatedMySuggestionsActionCreator(offset,userId)),
        sortChangeType: (type) => dispatch(changeSortType(type)),
        clearSuggestionsList: () => dispatch(clearSuggestionList()),
        loadSuggestionEnter: (userId, title) => dispatch(loadMySuggestionEnterActionCreator(userId, title)),
    };
};

export default connect(mapStatToProps, mapDispatchToProps)(MySuggestions);