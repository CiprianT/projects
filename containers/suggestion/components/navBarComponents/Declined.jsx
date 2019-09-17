/**
 * @author [Marius]
 */
import React from 'react';
import { Container, Row } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import ScrollUpButton from "react-scroll-up-button";
import ModalComponent from '../../modal/ModalComponent';
import { clearSuggestionList, loadPagginatedSuggestionActionCreator, loadPagginatedSuggestionByScoreActionCreator } from "../../redux/actionCreators/infiniteSuggestionActionCreators";
import { changeSortType, deleteSuggestionActionCreator, getTitlesSuggestionSearch, loadSuggestionEnterActionCreator, loadSuggestionTitleSearch, getSuggestionsByTagActionCreator } from '../../redux/actionCreators/suggestionActionCreators';
import CustomDropdown from '../dummyComponents/CustomDropdown';
import ESugestionStatus from '../ESugestionStatus';
import InfiniteSuggestions from '../InfiniteSuggestions';
import SearchPage from '../SearchPage';
import TagsInPage from '../TagsInPage';

class Declined extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: this.props.suggestionsList,
            modalShow: false,
            type: ESugestionStatus.DECLINED,
            filteringTags:[],
            isDisabled:false,


        }
      
        localStorage.setItem("status",ESugestionStatus.DECLINED);
        this.getTitle = this.getTitle.bind(this);
        this.getEmptyTitle = this.getEmptyTitle.bind(this);
        this.getTitleEnter = this.getTitleEnter.bind(this);
    }
    setModalStow = (b) => {
        this.setState({
            modalShow: b
        })
    }
    componentDidMount() {
        localStorage.setItem("status",ESugestionStatus.DECLINED);
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

    onClick = (event) => {
        event.preventDefault()
        const sortType = event.target.value === "true";
        this.props.sortChangeType(sortType)
        if (sortType) {
            this.props.clearSuggestionsList();
            this.props.sortDateSuggestion(ESugestionStatus.DECLINED, 0)
        }
        else {
            this.props.clearSuggestionsList();
            this.props.sortScoreSuggestion(ESugestionStatus.DECLINED, 0)
        }
    }

    getEmptyTitle = (title) => {
        if (title.length === 0) {
            this.props.clearSuggestionsList();
            this.props.loadSuggestions(0, this.state.type);
        }
    }

    submit = (id) => {
        confirmAlert({
            id: id,
            title: 'Confirm to delete',
            message: 'Are you sure to do delete this suggestion?',
            buttons: [
                
                {
                    label: 'No',
                    onClick: () => { }
                },
                {
                    label: 'Yes',
                    onClick: () => this.props.deleteSuggestion(id, ESugestionStatus.DECLINED)
                }
            ]
        });
    };

    addTagToFiltering=(tag)=>{
        var cond = this.state.filteringTags.filter(t => t.id === tag.id);
        if(cond.length===0){
            this.setState({
                filteringTags:[...this.state.filteringTags,tag],
                isDisabled:true
            },
            ()=>{
                this.props.loadWithTags(ESugestionStatus.DECLINED,this.state.filteringTags);
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
                this.props.loadSuggestions(0,ESugestionStatus.DECLINED)
                this.setState({
                    isDisabled:false,
                })
            }
            else{
                this.props.loadWithTags(ESugestionStatus.DECLINED, this.state.filteringTags)
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
                        <ModalComponent clearFilteringTags={this.clearFilterinTags} reload={false} reloadMine={null}></ModalComponent>

                    </div>
                    <div style={{ marginLeft: "260px" }}>
                        <SearchPage getTitleEnter={this.getTitleEnter} getTitle={this.getTitle} getEmptyTitle={this.getEmptyTitle} type={this.state.type}></SearchPage>
                    </div>
                    <TagsInPage  removeTagToFiltering={this.removeTagToFiltering} filteringTags={this.state.filteringTags}/>
                </Row>
                <Row>
                    <div className="centered-table">
                        <InfiniteSuggestions filterByTags={this.state.filteringTags.length>0} addTagToFiltering={this.addTagToFiltering} filteringTags = {this.state.filteringTags} status={ESugestionStatus.DECLINED} user={this.props.user} like={this.like} dislike={this.dislike} submit={this.submit}></InfiniteSuggestions>

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
        sortType: state.suggestionReducer.sortType,

    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        loadTitles: (type) => dispatch(getTitlesSuggestionSearch(type)),
        loadSuggestions: (offset, status) => dispatch(loadPagginatedSuggestionActionCreator(offset, status)),
        sortScoreSuggestion: (type, offset) => dispatch(loadPagginatedSuggestionByScoreActionCreator(offset, type)),
        sortDateSuggestion: (type, offset) => dispatch(loadPagginatedSuggestionActionCreator(offset, type)),
        loadSuggestionSearch: (title) => dispatch(loadSuggestionTitleSearch(title)),
        deleteSuggestion: (id, status) => dispatch(deleteSuggestionActionCreator(id, status)),
        clearSuggestionsList: () => dispatch(clearSuggestionList()),
        sortChangeType: (type) => dispatch(changeSortType(type)),
        loadSuggestionEnter: (type, title) => dispatch(loadSuggestionEnterActionCreator(type, title)),
        loadWithTags:(status,tags)=>dispatch(getSuggestionsByTagActionCreator(status,tags))
    };
};


export default connect(mapStatToProps, mapDispatchToProps)(Declined);