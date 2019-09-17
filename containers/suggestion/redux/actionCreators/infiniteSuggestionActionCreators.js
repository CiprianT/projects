import swal from 'sweetalert';
import axiosInstance from "../../../../axios/axios";
import { CLEAR_SUGGESTIONS_LIST, LOAD_MY_SUGGESTIONS, LOAD_MY_SUGGESTIONS_SCORE, LOAD_SOME_SUGGESTIONS } from "../actionTypes/infiniteSuggestionsActionTypes";

export const loadPagginatedSuggestionActionCreator=(offset,status) => {
    return dispatch => {
        
        return axiosInstance.get("http://localhost:8080/suggestion-service/get-suggestions-offset-date/" +offset+"/"+status).then((response)=>
        {
            const{values:suggestions}=response.data;
            dispatch(loadPagginatedSuggestionActionCreatorSuccesful(suggestions,status,offset));
        }).catch((err)=>{
            swal("Oops...", "Could not load suggestions!", "error");
        })
    }
 
}

export const loadPagginatedMySuggestionsActionCreator=(offset,userId) => {
    return dispatch => {
        return axiosInstance.get("http://localhost:8080/suggestion-service/get-by-user/"+offset+"/"+userId)
        .then((response)=>
        {
            const{values:suggestions}=response.data;
            dispatch(loadPagginatedMySuggestionsActionCreatorSuccesful(suggestions,offset));
        }).catch((err)=>{
            swal("Oops...", "Could not load your suggestions!", "error");
        })
    }
}

export const loadPagginatedSuggestionByScoreActionCreator=(offset,status) => {
    return dispatch => {
        
        return axiosInstance.get("http://localhost:8080/suggestion-service/get-suggestions-offset-score/" +offset+"/"+status).then((response)=>
        {
            const{values:suggestions}=response.data;
            dispatch(loadPagginatedSuggestionActionCreatorSuccesful(suggestions,status,offset));
        }).catch((err)=>{
            swal("Oops...", "Could not sort suggestions by score!", "error");
            
        })
    }
 
}

export const loadMySuggestionsByScoreActionCreator=(offset,userId)=>{
    return dispatch=>{
        return axiosInstance.get("http://localhost:8080/suggestion-service/get-by-user-score/"+offset+'/'+userId)
        .then((response)=>{
            const{values:suggestions}=response.data;
            dispatch(loadPagginatedMySuggestionsByScoreActionCreatorSuccesful(suggestions,offset))
        }).catch((err)=>{
            swal("Oops...","Could not sort your suggestions by score!","error");
        })
    }
}

export const loadPagginatedMySuggestionsByScoreActionCreatorSuccesful=(suggestions,offset)=>{
    return {
        type:LOAD_MY_SUGGESTIONS_SCORE,
        offset:offset,
        suggestions:suggestions,
    }
}

export const clearSuggestionList=() =>{
    return {
        type:CLEAR_SUGGESTIONS_LIST,
    }
}


const loadPagginatedSuggestionActionCreatorSuccesful=(suggestions,status,offset) =>{
    return {
        type: LOAD_SOME_SUGGESTIONS,
        suggestions:suggestions,
        status:status,
        offset:offset,

    }
}

const loadPagginatedMySuggestionsActionCreatorSuccesful=(suggestions,offset) =>{
    return {
        type: LOAD_MY_SUGGESTIONS,
        suggestions:suggestions,
        offset:offset,
    }
}