
import debounce from "lodash.debounce";
import React, { Component } from "react";
import { connect } from "react-redux";
import { loadThresholdsActionCreator } from "../../admin/redux/actionCreators/thresholdActionCreators";
import SuggestionCardMine from "../components/navBarComponents/SuggestionCardMine";
import { clearSuggestionList, loadMySuggestionsByScoreActionCreator, loadPagginatedMySuggestionsActionCreator, loadPagginatedSuggestionActionCreator, loadPagginatedSuggestionByScoreActionCreator } from "../redux/actionCreators/infiniteSuggestionActionCreators";
import ESugestionStatus from "./ESugestionStatus";
import CardAccepted from "./navBarComponents/cards/CardAccepted";
import CardActive from "./navBarComponents/cards/CardActive";
import CardDeclined from "./navBarComponents/cards/CardDeclined";
import CardImplemented from "./navBarComponents/cards/CardImplemented";
import CardPending from "./navBarComponents/cards/CardPending";

class InfiniteSuggestions extends Component {
    constructor(props) {
        super(props);

        // Sets up our initial state
        this.state = {

            error: false,
            hasMore: true,
            isLoading: false,
        };

        // Binds our scroll event handler
        window.onscroll = debounce(() => {
            const {
                state: {
                    error,
                    isLoading,
                    hasMore,
                },
            } = this;

            // Bails early if:
            // * there's an error
            // * it's already loading
            // * there's nothing left to load
            console.log("hasMore:", hasMore)
            console.log("hasMore:", error)
            console.log("hasMore:", isLoading)
            if (error || isLoading || !hasMore) return;


            // Checks that the page has scrolled to the bottom
            console.log("DOC", document.documentElement.offsetHeight)
            if (
                window.innerHeight + document.documentElement.scrollTop
                > document.documentElement.offsetHeight - 100
            ) {
                this.loadSuggestions();
            }
        }, 100);
    }

    componentDidMount() {

        this.props.clearSuggestionsList();
        this.props.loadPagginatedSuggestionActionCreator(0, this.props.status, this.props.user.id);
        this.props.loadThresholds();

    }

    loadSuggestions = () => {
        console.log("loadddddddddddddddddddddddddd")
        this.setState({
            isLoading: true,

        }, () => {
            const offset_rows = this.props.offset + 5;
            console.log("filterByTags:", this.props.filterByTags)
            if (this.props.filterByTags === false) {
                if (this.props.sortType === true)
                    this.props.loadPagginatedSuggestionActionCreator(offset_rows, this.props.status, this.props.user.id)
                else {
                    if (this.props.status === "MINE")
                        this.props.sortScoreMySuggestion(offset_rows, this.props.user.id)
                    else
                        this.props.sortScoreSuggestion(offset_rows, this.props.status)
                }
                this.setState({
                    hasMore: (this.props.suggestions.length < 100),
                    isLoading: false,
                })
            }
            else {
                this.setState({
                    hasMore: (this.props.suggestions.length < 100),
                    isLoading: false,
                })
            }
        });

    }
    render() {

        var suggestionCards = [];
        this.props.suggestions.map(suggestion => {
            if (this.props.status === ESugestionStatus.ACTIVE)
                suggestionCards.push(<CardActive addTag={this.props.addTagToFiltering} filteringTags={this.props.filteringTags} thresholds={this.props.thresholds} suggestion={suggestion} user={this.props.user} saveVote={this.props.saveVote} deleteVote={this.props.deleteVote} submit={this.props.submit} />)
            if (this.props.status === ESugestionStatus.PENDING)
                suggestionCards.push(<CardPending addTag={this.props.addTagToFiltering} filteringTags={this.props.filteringTags} suggestion={suggestion} updateScore={this.updateScore} user={this.props.user} like={this.props.like} dislike={this.props.dislike} submit={this.props.submit} accept={this.props.accept} decline={this.props.decline} />)
            if (this.props.status === ESugestionStatus.ACCEPTED)
                suggestionCards.push(<CardAccepted addTag={this.props.addTagToFiltering} filteringTags={this.props.filteringTags} suggestion={suggestion} updateScore={this.updateScore} user={this.props.user} like={this.props.like} dislike={this.props.dislike} submit={this.props.submit} implement={this.props.implemented} decline={this.props.declined} />)
            if (this.props.status === ESugestionStatus.IMPLEMENTED)
                suggestionCards.push(<CardImplemented addTag={this.props.addTagToFiltering} filteringTags={this.props.filteringTags} suggestion={suggestion} updateScore={this.updateScore} user={this.props.user} like={this.props.like} dislike={this.props.dislike} submit={this.props.submit} />)
            if (this.props.status === ESugestionStatus.DECLINED)
                suggestionCards.push(<CardDeclined addTag={this.props.addTagToFiltering} filteringTags={this.props.filteringTags} suggestion={suggestion} updateScore={this.updateScore} user={this.props.user} like={this.props.like} dislike={this.props.dislike} submit={this.props.submit} />)
            if (this.props.status === ESugestionStatus.MINE)
                suggestionCards.push(<SuggestionCardMine addTag={this.props.addTagToFiltering} filteringTags={this.props.filteringTags} thresholds={this.props.thresholds} suggestion={suggestion} updateScore={this.updateScore} user={this.props.user} like={this.props.like} dislike={this.props.dislike} submit={this.props.submit}></SuggestionCardMine>)
        })
        return suggestionCards;
    }
}

const mapStatToProps = (state) => {

    return {
        suggestions: state.suggestionReducer.suggestionList,
        offset: state.suggestionReducer.offset,
        thresholds: state.adminReducer,
        sortType: state.suggestionReducer.sortType,
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        loadPagginatedSuggestionActionCreator: (offset, status, userId) => {
            if (status === ESugestionStatus.MINE) {
                dispatch(loadPagginatedMySuggestionsActionCreator(offset, userId));
            } else {
                dispatch(loadPagginatedSuggestionActionCreator(offset, status))
            }
        },
        clearSuggestionsList: () => dispatch(clearSuggestionList()),
        loadThresholds: () => dispatch(loadThresholdsActionCreator()),
        sortScoreSuggestion: (offset, type) => dispatch(loadPagginatedSuggestionByScoreActionCreator(offset, type)),
        sortScoreMySuggestion: (offset, userId) => dispatch(loadMySuggestionsByScoreActionCreator(offset, userId)),
    };
};
export default connect(mapStatToProps, mapDispatchToProps)(InfiniteSuggestions);