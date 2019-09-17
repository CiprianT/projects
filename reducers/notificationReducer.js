import { DISCONNECT_CLIENT, GET_ALL_NOTIFICATIONS, MARK_AS_SEEN, STORE_NOTIFICATIONS_SUCCESS } from "../containers/suggestion/redux/actionTypes/notificationActionTypes";

const initialState ={
    notifications:[],
    client:{}
}

const notificationReducer = (state = initialState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case STORE_NOTIFICATIONS_SUCCESS:
            newState.notifications = [ action.notifications, ...state.notifications];
            newState.client=action.client;
            break;
        case DISCONNECT_CLIENT:
            action.client.disconnect();
            break;
        case GET_ALL_NOTIFICATIONS:
            newState.notifications = action.notifications;
            break;
        case MARK_AS_SEEN:
            newState.notifications = action.notifications;
            break;
        default:
            break;
    }
    return newState;
}

export default notificationReducer;