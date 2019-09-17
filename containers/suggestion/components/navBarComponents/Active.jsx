/**
 * @author [Andra Marian]
 */
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import { connect } from 'react-redux';
import ScrollUpButton from "react-scroll-up-button";
import "../../components/style/cardStyle.css";
import ModalComponent from '../../modal/ModalComponent';
import { clearSuggestionList, loadPagginatedSuggestionActionCreator, loadPagginatedSuggestionByScoreActionCreator } from "../../redux/actionCreators/infiniteSuggestionActionCreators";
import { changeSortType, deleteSuggestionActionCreator, getTitlesSuggestionSearch, loadSuggestionEnterActionCreator, loadSuggestionTitleSearch, sendUndoVoteActionCreator, sendVoteActionCreator, getSuggestionsByTagActionCreator } from '../../redux/actionCreators/suggestionActionCreators';
import CustomDropdown from '../dummyComponents/CustomDropdown';
import ESugestionStatus from '../ESugestionStatus';
import InfiniteSuggestions from '../InfiniteSuggestions';
import SearchPage from '../SearchPage';
import "../style/tableStyle.css";
import "./style/dropdown.css";
import TagsInPage from '../TagsInPage.jsx';

class Active extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            type: ESugestionStatus.ACTIVE,
            filteringTags:[],
            isDisabled:false,

        }
        localStorage.setItem("status",ESugestionStatus.ACTIVE)
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
        localStorage.setItem("status",ESugestionStatus.ACTIVE)
        this.props.clearSuggestionsList();
    }

    updateComponentSearch() {
        this.setState(this.state);
        this.props.loadSuggestionSearch(this.state.type);
    }

    getTitle = (title) => {
        this.props.loadSuggestionSearch(title);
    }

    getTitleEnter = (title) => {
        if(title.length !== 0)
            this.props.loadSuggestionEnter(this.state.type, title);
    }

    getEmptyTitle = (title) => {
        if (title.length === 0) {
            this.props.clearSuggestionsList();
            this.props.loadSuggestions(0, this.state.type);
        }
    }


    deleteVote = (suggestionID) => {
        this.props.undoVoting({ user: this.props.user.id, suggestionID: suggestionID });
    }
    saveVote = (suggestionID, preference) => {
        this.props.voting({ pref: preference, user: this.props.user.id, suggestionID: suggestionID });
    }
    submit = (id) => {
        confirmAlert({
            id: id,
            title: 'Confirm delete',
            message: 'Are you sure to do delete this suggestion?',
            buttons: [
                {
                    label: 'Yes',
                    onClick: () => this.props.deleteSuggestion(id, ESugestionStatus.ACTIVE)
                },
                {
                    label: 'No',
                    onClick: () => { }
                }
            ]


        });
    };


    onClick = (event) => {
        event.preventDefault()
        const sortType = event.target.value === "true";
        this.props.sortChangeType(sortType)
        if (sortType) {
            this.props.clearSuggestionsList();
            this.props.sortDateSuggestion(ESugestionStatus.ACTIVE, 0)
        }
        else {
            this.props.clearSuggestionsList();
            this.props.sortScoreSuggestion(ESugestionStatus.ACTIVE, 0)
        }
    }
    addTagToFiltering=(tag)=>{
        var cond = this.state.filteringTags.filter(t => t.id === tag.id);
        if(cond.length===0){
            this.setState({
                filteringTags:[...this.state.filteringTags,tag],
                isDisabled:true
            },
            ()=>{
                this.props.loadWithTags(ESugestionStatus.ACTIVE,this.state.filteringTags);
            })
        }
    }

    removeTagToFiltering=(tag)=>{
        var newList = this.state.filteringTags.filter(t => t.id !== tag.id);
        this.setState({
            filteringTags:[...newList]
        },
        ()=>{
            if(this.state.filteringTags.length===0){
                this.props.clearSuggestionsList();
                this.props.loadSuggestions(0,ESugestionStatus.ACTIVE)
                this.setState({
                    isDisabled:false,
                })
            }
            else{
                this.props.loadWithTags(ESugestionStatus.ACTIVE, this.state.filteringTags)
            }
        })
    }

    clearFilterinTags=()=>{
        this.setState({
            filteringTags:[],
            isDisabled:false
        })
    }

    render() {

        return (
            <Container fluid={true}>
                <Row style={{ marginBottom: "8px", marginTop: "5px" }}>
                    <div style={{ display: 'flex', justifyContent: 'center', float: 'left' }} >
                        <CustomDropdown isDisabled={this.state.isDisabled} className="create styled-select semi-square" onClick={this.onClick} selected={this.props.sortType} />
                        <ScrollUpButton />
                    </div>
                    <div style={{ marginLeft: "10px" }}>
                        <ModalComponent clearFilteringTags={this.clearFilterinTags} reload={true} reloadMine={null}></ModalComponent>

                    </div>
                    <div style={{ marginLeft: "260px" }}>
                        <SearchPage getTitleEnter={this.getTitleEnter} getTitle={this.getTitle} getEmptyTitle={this.getEmptyTitle} type={this.state.type}></SearchPage>
                    </div>
                    <TagsInPage  removeTagToFiltering={this.removeTagToFiltering} filteringTags={this.state.filteringTags}/>

                </Row>
                <Row>
                    <div className="centered-table ">
                        <InfiniteSuggestions filterByTags={this.state.filteringTags.length>0} addTagToFiltering={this.addTagToFiltering} filteringTags = {this.state.filteringTags} addTagToFiltering={this.addTagToFiltering} filteringTags = {this.state.filteringTags} status={ESugestionStatus.ACTIVE} user={this.props.user} saveVote={this.saveVote} deleteVote={this.deleteVote} submit={this.submit}></InfiniteSuggestions>
                    </div>

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
        score: state.suggestionReducer.score,
        sortType: state.suggestionReducer.sortType,
        titles: state.suggestionReducer.suggestionTitles
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        loadTitles: (type) => dispatch(getTitlesSuggestionSearch(type)),
        loadSuggestions: (offset, status) => dispatch(loadPagginatedSuggestionActionCreator(offset, status)),
        loadSuggestionSearch: (title) => dispatch(loadSuggestionTitleSearch(title)),
        voting: (vote) => dispatch(sendVoteActionCreator(vote)),
        undoVoting: (vote) => dispatch(sendUndoVoteActionCreator(vote)),
        deleteSuggestion: (id, status) => dispatch(deleteSuggestionActionCreator(id, status)),
        sortScoreSuggestion: (type, offset) => dispatch(loadPagginatedSuggestionByScoreActionCreator(offset, type)),
        sortDateSuggestion: (type, offset) => dispatch(loadPagginatedSuggestionActionCreator(offset, type)),
        sortChangeType: (type) => dispatch(changeSortType(type)),
        clearSuggestionsList: () => dispatch(clearSuggestionList()),
        loadSuggestionEnter: (type, title) => dispatch(loadSuggestionEnterActionCreator(type, title)),
        loadWithTags:(status,tags)=>dispatch(getSuggestionsByTagActionCreator(status,tags))
    };
};








export default connect(mapStatToProps, mapDispatchToProps)(Active);