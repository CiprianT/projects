import swal from 'sweetalert';
import axiosInstance from "../../../../axios/axios";
import ESugestionStatus from "../../components/ESugestionStatus";
import { ACCEPT_PENDING, CHANGE_SORT_TYPE, CREATE_REASON, CREATE_SUGGESTION_FAILURE, CREATE_SUGGESTION_SUCCESS, DECLINE_PENDING, DELETE_SUGGESTION_SUCCESS, EDIT_SUGGESTION_SUCCESS, IMPLEMENT_IMPLEMENTED, LOAD_SUGGESTIONS_BY_TITLE_SUCCESS, LOAD_SUGGESTION_ENTER_TITLE, SORT_BY_DATE_SUCCESS, SORT_BY_SCORE_SUCCESS, TITLE_SUGGESTIONS_SEARCH_SUCCESS, UNDO_VOTE_SUGGESTION_SUCCESFUL, VOTE_SUGGESTION_SUCCESFUL, GET_SUGGESTIONS_BY_TAG } from "../actionTypes/suggestionActionTypes";
import { clearSuggestionList, loadPagginatedMySuggestionsActionCreator, loadPagginatedSuggestionActionCreator } from "./infiniteSuggestionActionCreators";
/**
 * Sends a suggestion to BackEnd to be created.
 * @param {*} suggestion 
 * @author [Laura Luca]
 */

export const createSuggestionActionCreator = (suggestion, reload,userId) => {
    return dispatch => {

        return axiosInstance
            .post("http://localhost:8080/suggestion-service/create-suggestion", { ...suggestion })
            .then(res => {

                dispatch(createSuggestionSuccessActionCreator());
                dispatch(changeSortType(true));
                if(reload){
                    dispatch(clearSuggestionList());
                    dispatch(loadPagginatedSuggestionActionCreator(0, ESugestionStatus.ACTIVE));
                    dispatch(getTitlesSuggestionSearch(ESugestionStatus.ACTIVE));
                }
                else{
                    if(userId!==null){
                        dispatch(clearSuggestionList());
                        dispatch(loadPagginatedMySuggestionsActionCreator(0, userId));
                        dispatch(getTitlesMySuggestionsSearch(userId));
                    }
                }
            })
            .catch(err => {

                dispatch(createSuggestionFailuresActionCreator(err.message))
            })
    }
}


/**
 * Creates a failure action for create-suggestion operation.
 * @param {string} message
 * @author [Laura Luca] 
 */
export const createSuggestionFailuresActionCreator = message => {
    return {
        type: CREATE_SUGGESTION_FAILURE,
        errorMessage: message

    }
}
/**
 * Creates a success action for create-suggestion operation.
 * @author [Laura Luca]
 */
export const createSuggestionSuccessActionCreator = () => {
    return {
        type: CREATE_SUGGESTION_SUCCESS
    }
}




/**
 * @author [Andra Marian]
 */
export const sendVoteActionCreator = (vote) => {
    return dispatch => {
        return axiosInstance.post("http://localhost:8080/vote-service/vote-save",
            { preference: vote.pref, userId: vote.user, suggestionId: vote.suggestionID })
            .then((response) => {
                const res = response.data;
                dispatch(voteActionSuccesful(res))
            }
            ).catch((err) => {
                swal("Oops...", "There was a problem with your vote", "info");
            })
    }
}
export const sendUndoVoteActionCreator = (vote) => {
    return dispatch => {
        return axiosInstance.delete("http://localhost:8080/vote-service/vote-delete/" + vote.user + "/" + vote.suggestionID)
            .then((response) => {
                
                dispatch(undoVoteActionSuccesful(vote))

            }
            ).catch((err) => {
                swal("Oops...", "There was a problem with your vote", "info");
            })
    }
}

export const loadSuggestionsSorted = () => {
    return (dispatch, getState) => {
        const state = getState();
        const sortType = state.suggestionReducer.sortType;
        if (sortType) {
            
        }
        else {
            dispatch(sortByScoreActionCreator(ESugestionStatus.ACTIVE))
        }

    }
}
/**
 * @author [Andra Marian]
 */
const voteActionSuccesful = (vote) => {

    return {

        type: VOTE_SUGGESTION_SUCCESFUL,
        vote: vote,

    }
}
const undoVoteActionSuccesful = (vote) => {

    return {

        type: UNDO_VOTE_SUGGESTION_SUCCESFUL,
        vote: vote,

    }
}


/**
 * @author [Ionescu Radu]
 */

export const sortByScoreActionCreator = (type,offset) => {

    return dispatch => {
        return axiosInstance.get("http://localhost:8080/suggestion-service/get-by-preference/" + type)
            .then((response) => {
       
                const { values: suggestions } = response.data;
                dispatch(sortByScoreActionSuccesful(suggestions));


            }).catch((err) => {

                swal("Oops...", "Failed", "info");
            })
    }
}

export const changeSortType = (type) => {

    return {

        type: CHANGE_SORT_TYPE,
        sortType: type

    }
}

/**
 * @author [Ionescu Radu]
 */
const sortByScoreActionSuccesful = (suggestions) => {
    return {
        type: SORT_BY_SCORE_SUCCESS,
        suggestions: suggestions
    }
}



/**
 * @author [Ionescu Radu]
 */
export const sortByDateActionSuccesful = (suggestions) => {
    return {
        type: SORT_BY_DATE_SUCCESS,
        suggestions: suggestions,
        
    }
}


/**
 * @author [Teisanu Cipiran]
 */

export const getTitlesSuggestionSearch = (type) => {
    return dispatch => {
        return axiosInstance.get("http://localhost:8080/suggestion-service/get-titles/" + type)
            .then((response) => {
                const res = response.data;
                dispatch(changeSortType(true));
                dispatch(getTitlesActionSuccesful(res))

            }).catch((err) => {
            swal("Oops...", "Could not load titles!", "error");
          
            })
    }
}

export const getTitlesMySuggestionsSearch = (userId) => {
    return dispatch => {
        return axiosInstance.get("http://localhost:8080/suggestion-service/get-title-by-user/"+userId)
            .then((response) => {
                const res = response.data;
                dispatch(changeSortType(true));
                dispatch(getTitlesActionSuccesful(res))

            }).catch((err) => {
                swal("Oops...", "Could not load titles for your suggestions!", "error");
            })
    }
}

const getTitlesActionSuccesful = (titles) => {
    return {
        type: TITLE_SUGGESTIONS_SEARCH_SUCCESS,
        titles: titles
    }
}

/**
 * @author [Teisanu Cipiran]
 */

export const loadSuggestionTitleSearch = (title) => {
    return dispatch => {
        return axiosInstance.get("http://localhost:8080/suggestion-service/get-by-title/" + title)
            .then((response) => {
                const { values: suggestions } = response.data;
                
                dispatch(loadSuggestionSearchTitleActionSuccesful(suggestions));
            }).catch((err) => {

                swal("Oops...", "Could not search for suggestions", "error");
            })
    }
}

export const loadSuggestionEnterActionCreator = (type, title) => {
    return dispatch => {
        return axiosInstance.get("http://localhost:8080/suggestion-service/get-on-enter/"+type+"/"+title)
        .then((response) => {
            const { values: suggestions } = response.data;
            dispatch(loadSuggestionEnterTitleSuccesful(suggestions));
        }).catch((err) =>{
            alert("Could not find suggestions on enter");
        })
    }
}

export const loadMySuggestionEnterActionCreator = (userId, title) => {
    return dispatch => {
        return axiosInstance.get("http://localhost:8080/suggestion-service/get-on-enter-by-user-and-title/"+userId+"/"+title)
        .then((response) => {
            const { values: suggestions } = response.data;
            dispatch(loadSuggestionEnterTitleSuccesful(suggestions));
        }).catch((err) =>{
            alert("Could not find my suggestions on enter");
        })
    }
}

const loadSuggestionEnterTitleSuccesful = (suggestions) => {
    return{
        type: LOAD_SUGGESTION_ENTER_TITLE,
        suggestions: suggestions
    }
}

const loadSuggestionSearchTitleActionSuccesful = (suggestions) => {
    return {
        type: LOAD_SUGGESTIONS_BY_TITLE_SUCCESS,
        suggestions: suggestions
    }
}

export const deleteSuggestionActionCreator = (id,status) => {
    return dispatch => {
        return axiosInstance.delete("http://localhost:8080/suggestion-service/delete-suggestion/"+id)
        .then(() => {
            dispatch(changeSortType(true));
            dispatch(clearSuggestionList());
            dispatch(loadPagginatedSuggestionActionCreator(0,status));
            dispatch(deleteSuggestionActionSuccesful());
        }).catch((err) => {
            swal("Oops...", "Could not delete your suggestion", "info");
        })
    }
}

export const deleteMySuggestionActionCreator = (id,userId) => {
    return dispatch => {
        return axiosInstance.delete("http://localhost:8080/suggestion-service/delete-suggestion/"+id)
        .then(() => {
            dispatch(changeSortType(true));
            dispatch(clearSuggestionList());
            dispatch(loadPagginatedMySuggestionsActionCreator(0,userId));
            dispatch(deleteSuggestionActionSuccesful());
        }).catch((err) => {
            alert("Could not delete my suggestion!");
        })
    }
}

const deleteSuggestionActionSuccesful = () => {
    return {
        type: DELETE_SUGGESTION_SUCCESS
    }
}


/**
* @author [Ionescu Radu]
*/
export const acceptSuggestionPending = (id) => {
    return dispatch => {
        return axiosInstance.post("http://localhost:8080/admin/accepted/" + id)
            .then(() => {
                dispatch(changeSortType(true));
                dispatch(clearSuggestionList());
                dispatch(loadPagginatedSuggestionActionCreator(0,ESugestionStatus.PENDING));
                dispatch(acceptSuggestionPendingSuccesful())

                
            }
            ).catch((err) => {
                swal("Oops...", "Could not accept this suggestion", "info");
            })
    }
}

const acceptSuggestionPendingSuccesful = () => {
    return {
        type: ACCEPT_PENDING
    }
}

export const declineSuggestionPending = (reason,status) => {
    return dispatch => {
        return axiosInstance.post("http://localhost:8080/admin/declined/",{...reason})
            .then(() => {
                dispatch(changeSortType(true));
                dispatch(clearSuggestionList());
                dispatch(loadPagginatedSuggestionActionCreator(0,status));
                dispatch(declineSuggestionPendingSuccesful())

            }
            ).catch((err) => {
                swal("Oops...", "Could not decline this suggestion", "info");
            })
    }
}

const declineSuggestionPendingSuccesful = () => {
    return {
        type: DECLINE_PENDING
    }
}

export const implementSuggestionImplemented = (id) => {
    return dispatch => {
        return axiosInstance.post("http://localhost:8080/admin/implemented/" + id)
            .then(() => {
                dispatch(changeSortType(true));
                dispatch(implementSuggestionImplementedSuccesful())
                dispatch(clearSuggestionList());
                dispatch(loadPagginatedSuggestionActionCreator(0,ESugestionStatus.ACCEPTED));
            }
            ).catch((err) => {
                swal("Oops...", "Could not implement this suggestion", "info");
            })
    }
}

const implementSuggestionImplementedSuccesful = () => {
    return {
        type: IMPLEMENT_IMPLEMENTED
    }
}

export const editSuggestionActionCreator = (suggestion) => {
    return dispatch => {
        return axiosInstance.put("http://localhost:8080/suggestion-service/update",
            { id: suggestion.id, title: suggestion.title, text: suggestion.text, anonymous: suggestion.anonymous, tags: suggestion.tags }).then(() => {
                console.log(" A  I  C  I  @ @ @ @ @ @ @ @ @ @",suggestion)
                if(suggestion.userId!==null){
                    dispatch(changeSortType(true));
                    dispatch(editSuggestionSuccesful());
                    dispatch(clearSuggestionList());
                    dispatch(loadPagginatedMySuggestionsActionCreator(0, suggestion.userId));
                    dispatch(getTitlesMySuggestionsSearch(suggestion.userId))
                }else{
                dispatch(changeSortType(true));
                dispatch(clearSuggestionList());
                dispatch(loadPagginatedSuggestionActionCreator(0, ESugestionStatus.ACTIVE));
                dispatch(getTitlesSuggestionSearch(ESugestionStatus.ACTIVE));
                dispatch(editSuggestionSuccesful());

            }}).catch((err) => {
                swal("Oops...", "Could not edit this suggestion", "info");
            })
    }
}

const editSuggestionSuccesful = () => {
    return {
        type: EDIT_SUGGESTION_SUCCESS
    }
}


export const createReasonActionCreator = (reason, status) => {
    return dispatch => {

        return axiosInstance
            .post("http://localhost:8080/admin/delete-suggestion", { ...reason })
            .then(res => {
                dispatch(changeSortType(true));
                dispatch(clearSuggestionList());
                dispatch(loadPagginatedSuggestionActionCreator(0,status));
                dispatch(createReasonActionCreatorSuccesful())
            })
            .catch(err => {

                swal("Oops...", "Fail to create a reason", "info");
            })
    }
}

const createReasonActionCreatorSuccesful=()=>{
    return{
        type:CREATE_REASON
    }
}


export const getSuggestionsByTagActionCreator = (status,tags) => {
    return dispatch => {
        return axiosInstance
        .post("http://localhost:8080/suggestion-service/get-by-tags/" + status,tags)
        .then((response) => {
            const { values: suggestions } = response.data;
            dispatch(changeSortType(true));
            if(tags.length === 0){
                dispatch(clearSuggestionList());
                dispatch(loadPagginatedSuggestionActionCreator(0, status));
            }else{
                dispatch(getSuggestionsByTagActionSuccesful(suggestions));
            }

        }).catch((err)=>{
            swal("Oops...", "Could not load tags!", "error");
            
        })
    }
}

export const getSuggestionsByTagActionSuccesful=(suggestions)=>{
    return {
        type:GET_SUGGESTIONS_BY_TAG,
        suggestions:suggestions
    }
}