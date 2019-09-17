import ESugestionStatus from "../containers/suggestion/components/ESugestionStatus";
import { CLEAR_SUGGESTIONS_LIST, LOAD_MY_SUGGESTIONS, LOAD_MY_SUGGESTIONS_SCORE, LOAD_SOME_SUGGESTIONS } from "../containers/suggestion/redux/actionTypes/infiniteSuggestionsActionTypes";
import { ACCEPT_PENDING, CHANGE_SORT_TYPE, CREATE_REASON, CREATE_SUGGESTION_FAILURE, CREATE_SUGGESTION_SUCCESS, DECLINE_PENDING, DELETE_SUGGESTION_SUCCESS, EDIT_SUGGESTION_SUCCESS, LOAD_SUGGESTIONS_BY_TITLE_SUCCESS, LOAD_SUGGESTION_ENTER_TITLE, TITLE_SUGGESTIONS_SEARCH_SUCCESS, UNDO_VOTE_SUGGESTION_SUCCESFUL, VOTE_SUGGESTION_SUCCESFUL, GET_SUGGESTIONS_BY_TAG } from "../containers/suggestion/redux/actionTypes/suggestionActionTypes";

/**
 * @author [Andra Marian]
 */

var initialState={
    suggestionList:[],
    status:ESugestionStatus.PENDING,
    offset:0,
    sortType: true,
    suggestionTitles:[]
}

const suggestionReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case VOTE_SUGGESTION_SUCCESFUL:
            var aux = newState.suggestionList
            for (var i in aux) {
                if (aux[i].id === action.vote.suggestion) {
                    aux[i].score = aux[i].score + action.vote.pref;
                    aux[i].userPreference = action.vote.pref;
                }
            }
            newState.suggestionList = aux;

            break;
        case UNDO_VOTE_SUGGESTION_SUCCESFUL:
            var aux = newState.suggestionList
            for (var i in aux) {
                if (aux[i].id === action.vote.suggestion) {
                    aux[i].score = aux[i].score - aux[i].userPreference;
                    aux[i].userPreference = 0;
                }
            }
            newState.suggestionList = aux;

            break;
        case LOAD_SUGGESTION_ENTER_TITLE:
            newState.suggestionList = action.suggestions;
            var aux = newState.suggestionList
            for (var i in aux) {
                if (aux[i].photo == null || aux[i].firstAndLastName === "Anonymous") {
                    aux[i].photo = "/images/profile_man.jpg"
                }
            }
            newState.suggestionList = aux;
            newState.offset = 1000;
            break;
        case CREATE_SUGGESTION_FAILURE:
            alert(action.errorMessage);
            newState.voted = action.suggestion;
            newState.score = action.score;
            break;
        case CREATE_SUGGESTION_SUCCESS:
            newState.offset = 0;
            break;
        case LOAD_SOME_SUGGESTIONS:

            newState.offset = action.offset;
            newState.suggestionList = [...newState.suggestionList, ...action.suggestions];

            var aux = newState.suggestionList
            for (var i in aux) {
                if (aux[i].photo === null || aux[i].firstAndLastName === "Anonymous") {
                    aux[i].photo = "/images/profile_man.jpg"
                }
            }
            newState.suggestionList = aux;
            break;

        case LOAD_MY_SUGGESTIONS:
            newState.offset = action.offset;
            
            newState.suggestionList = [...newState.suggestionList, ...action.suggestions];
            var aux = newState.suggestionList
            for (var i in aux) {
                if (aux[i].photo === null || aux[i].firstAndLastName === "Anonymous") {
                    aux[i].photo = "/images/profile_man.jpg"
                }
            }
            newState.suggestionList = aux;
            break;
        case LOAD_MY_SUGGESTIONS_SCORE:
            newState.offset=action.offset;
            newState.suggestionList=[...newState.suggestionList, ... action.suggestions];
            var aux=newState.suggestionList;
            for(var i in aux) {
                if (aux[i].photo === null || aux[i].firstAndLastName === "Anonymous") {
                    aux[i].photo = "/images/profile_man.jpg"
                }
            }
            newState.suggestionList = aux;
            break;

        case TITLE_SUGGESTIONS_SEARCH_SUCCESS:
            newState.suggestionTitles = action.titles;
            break;
        case LOAD_SUGGESTIONS_BY_TITLE_SUCCESS:
            newState.suggestionList = action.suggestions;
            var aux = newState.suggestionList
            for (var i in aux) {
                if (aux[i].photo == null || aux[i].firstAndLastName === "Anonymous") {
                    aux[i].photo = "/images/profile_man.jpg"
                }
            }
            newState.suggestionList = aux;
            break;
        case DELETE_SUGGESTION_SUCCESS:
            break;
        case EDIT_SUGGESTION_SUCCESS:
            break;
        case CLEAR_SUGGESTIONS_LIST:
            newState.suggestionList = [];
            newState.offset = 0;
            break;
        case CHANGE_SORT_TYPE:
            newState.sortType = action.sortType;
            break;
        case ACCEPT_PENDING:
            break;
        case DECLINE_PENDING:
            break;
        case CREATE_REASON:
            break;
        case GET_SUGGESTIONS_BY_TAG: 
            newState.suggestionList = action.suggestions;
            var aux = newState.suggestionList
            for (var i in aux) {
                if (aux[i].photo == null || aux[i].firstAndLastName === "Anonymous") {
                    aux[i].photo = "/images/profile_man.jpg"
                }
            }
            break;
        default:
            break;
    }

    return newState;
}

export default suggestionReducer