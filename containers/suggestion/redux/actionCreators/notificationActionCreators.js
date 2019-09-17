import { Stomp } from "@stomp/stompjs";
import swall from "sweetalert";
import axiosInstance from "../../../../axios/axios";
import ESugestionStatus from "../../components/ESugestionStatus";
import { DISCONNECT_CLIENT, GET_ALL_NOTIFICATIONS, MARK_AS_SEEN, STORE_NOTIFICATIONS_SUCCESS } from "../actionTypes/notificationActionTypes";
import { clearSuggestionList, loadPagginatedMySuggestionsActionCreator, loadPagginatedSuggestionActionCreator } from "./infiniteSuggestionActionCreators";
import { changeSortType, getTitlesMySuggestionsSearch, getTitlesSuggestionSearch } from "./suggestionActionCreators";
var stompClient = Stomp.client('ws://localhost:8080/stomp');


export const storeNotifications = (user,sts) =>{
    return dispatch => {
        stompClient.connect(user, "", () => {
        stompClient.subscribe("/user/"+user+"/queue/now",(notifications) => {
            var notifs = JSON.parse(notifications.body);
            if(notifs.description.includes("PENDING")){
                var status=localStorage.status;
                if(status===ESugestionStatus.ACTIVE || status===ESugestionStatus.PENDING )
                {
                    dispatch(changeSortType(true));
                    dispatch(clearSuggestionList());
                    dispatch(loadPagginatedSuggestionActionCreator(0, status));
                    dispatch(getTitlesSuggestionSearch(status));
                }
                else{
                    if(status===ESugestionStatus.MINE){
                        dispatch(changeSortType(true));
                        dispatch(clearSuggestionList());
                        dispatch(loadPagginatedMySuggestionsActionCreator(0, user));
                        dispatch(getTitlesMySuggestionsSearch(user));
                    }
                }
            }
            dispatch(storeNotificationsSuccesful(notifs,stompClient))
        }, 
        { id: user});
        
        }
        );
    }
}

export const disconnectClient=()=>{
    return dispatch=>{
        dispatch(disconnectClientSuccess());
    }
}
export const storeNotificationsSuccesful = (notifications,client) =>{
    return {
        type:STORE_NOTIFICATIONS_SUCCESS,
        notifications: notifications,
        client:client,
    }
}

export const disconnectClientSuccess = () => {
    return {
        type: DISCONNECT_CLIENT,
        client: stompClient,
    }
}

export const getAllNotifications = (userId) => {
    return dispatch => {
        return axiosInstance.get("http://localhost:8080/notification-service/get-mine/" + userId)
            .then((response) => {
                const { values: notifications } = response.data;
                dispatch(getAllNotificationsSucces(notifications));
            }
            ).catch((err) => {
                swall("Ups", "Could not get notifications!", "error");
            })
    }
}

export const getAllNotificationsSucces = (notifications) => {
    return {
        type: GET_ALL_NOTIFICATIONS,
        notifications: notifications
    }
}

export const markAsSeen = (userId) => {
    return dispatch => {
        return axiosInstance.get("http://localhost:8080/notification-service/mark-as-seen/" + userId)
            .then((response) => {
                const { values: notifications } = response.data;
                dispatch(markAsSeenSuccess(notifications));
            }
            ).catch((err) => {
                swall("Ups", "Could not get notifications!", "error");
            })
    }
}

export const markAsSeenSuccess = (notifications) =>{
    return{
        type:MARK_AS_SEEN,
        notifications: notifications
    }
}