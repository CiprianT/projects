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


class Implemented extends React.Component{
    constructor(props){
        super(props);
        this.state={
            
            modalShow: false,
            type:ESugestionStatus.IMPLEMENTED,
            filteringTags:[],
            isDisabled:false,


        }
        localStorage.setItem("status",ESugestionStatus.IMPLEMENTED);
        this.getTitle = this.getTitle.bind(this);
        this.getEmptyTitle = this.getEmptyTitle.bind(this);
        this.getEmptyTitle = this.getEmptyTitle.bind(this);
        this.getTitleEnter = this.getTitleEnter.bind(this);
        this.submit=this.submit.bind(this);
    }
    setModalStow = (b) => {
        this.setState({
            modalShow: b
        })
    }
    componentDidMount() {
        
        this.setState({
            
            type:ESugestionStatus.IMPLEMENTED,
        })
        localStorage.setItem("status",ESugestionStatus.IMPLEMENTED);
        this.props.clearSuggestionsList();

    }



    updateComponentSearch() {
        this.setState(this.state);
        this.props.loadSuggestionSearch(this.state.type);

    }

    getTitle = (title) => {
        this.props.loadSuggestionSearch(title);
    }

    getEmptyTitle = (title) => {
        if (title.length === 0){
            this.props.clearSuggestionsList();
            this.props.loadSuggestions(0, this.state.type);
        }
    }

    getTitleEnter = (title) => {
        if(title.length !== 0)
            this.props.loadSuggestionEnter(this.state.type, title);
    }
    
    getTitleEnter = (title) => {
        this.props.loadSuggestionEnter(this.state.type, title);
    }

    onClick = (event) => {
        event.preventDefault()
        const sortType = event.target.value === "true";
        this.props.sortChangeType(sortType)
        if (sortType) {
            this.props.clearSuggestionsList();
            this.props.sortDateSuggestion(ESugestionStatus.IMPLEMENTED,0)
        }
        else {
            this.props.clearSuggestionsList();
            this.props.sortScoreSuggestion(ESugestionStatus.IMPLEMENTED,0)
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
              onClick: () => {}
            },
            {
              label: 'Yes',
              onClick: () => this.props.deleteSuggestion(id,ESugestionStatus.IMPLEMENTED)
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
                this.props.loadWithTags(ESugestionStatus.IMPLEMENTED,this.state.filteringTags);
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
                this.props.loadSuggestions(0,ESugestionStatus.IMPLEMENTED)
                this.setState({
                    isDisabled:false,
                })
            }
            else{
                this.props.loadWithTags(ESugestionStatus.IMPLEMENTED, this.state.filteringTags)
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
                <Row style={{marginBottom:"8px", marginTop:"5px"}}>
                    <div style={{ display: 'flex', justifyContent: 'center', float: 'left' }} >
                            <CustomDropdown className="create styled-select semi-square" onClick={this.onClick} selected={this.props.sortType} />
                            <ScrollUpButton />
                        </div>
                        <div style={{ marginLeft: "10px" }}>
                            <ModalComponent isDisabled={this.state.isDisabled} clearFilteringTags={this.clearFilterinTags} reload={false} reloadMine={null}></ModalComponent>

                        </div>
                        <div style={{marginLeft:"260px"}}>
                            <SearchPage getTitleEnter={this.getTitleEnter} getTitle={this.getTitle} getEmptyTitle={this.getEmptyTitle} type={this.state.type}></SearchPage>
                        </div>
                        <TagsInPage  removeTagToFiltering={this.removeTagToFiltering} filteringTags={this.state.filteringTags}/>
                </Row>
                <Row>
                    <div className="centered-table ">
                    <InfiniteSuggestions filterByTags={this.state.filteringTags.length>0} addTagToFiltering={this.addTagToFiltering} filteringTags = {this.state.filteringTags} status={ESugestionStatus.IMPLEMENTED} user={this.props.user} like={this.like} dislike={this.dislike} submit={this.submit}></InfiniteSuggestions>


                    </div>

                </Row>
            </Container>
        )
    }
}

const mapStatToProps = (state) => {

    return {
        suggestions: state.suggestionReducer.suggestionList,
        user : state.userReducer.user,
        sortType: state.suggestionReducer.sortType,

    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        loadTitles: (type) => dispatch(getTitlesSuggestionSearch(type)),
        loadSuggestions: (offset, status) => dispatch(loadPagginatedSuggestionActionCreator(offset, status)),
        sortChangeType: (type) => dispatch(changeSortType(type)),
        loadSuggestionSearch: (title) => dispatch(loadSuggestionTitleSearch(title)),
        deleteSuggestion: (id,status) => dispatch(deleteSuggestionActionCreator(id,status)),
        clearSuggestionsList:()=>dispatch(clearSuggestionList()),
        sortScoreSuggestion: (type,offset) => dispatch(loadPagginatedSuggestionByScoreActionCreator(offset,type)),
        sortDateSuggestion: (type,offset) => dispatch(loadPagginatedSuggestionActionCreator(offset,type)),
        loadSuggestionEnter: (type, title) => dispatch(loadSuggestionEnterActionCreator(type, title)),
        loadWithTags:(status,tags)=>dispatch(getSuggestionsByTagActionCreator(status,tags))
        
    };
};


export default connect(mapStatToProps, mapDispatchToProps)(Implemented);