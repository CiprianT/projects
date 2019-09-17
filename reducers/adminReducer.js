import { CLEAR_USER, LOAD_ONEUSER_SUCCESFUL, LOAD_USERSINFO_SUCCESFUL } from "../containers/admin/redux/actionTypes/superAdminActionTypes";
import { LOAD_THRESHOLDS_SUCCESFUL, UPDATE_THRESHOLD_SUCCESFUL } from "../containers/admin/redux/actionTypes/tresholdActionTypes";
import { CREATE_REASON } from "../containers/suggestion/redux/actionTypes/suggestionActionTypes";

/**
 * @author [Laura Luca] 
 */

const initialAdminState  = {
    usersInfo:[],
    
}
const adminReducer = (state =initialAdminState, action)=>{
    const newState = {...state};
    switch(action.type){
        case LOAD_THRESHOLDS_SUCCESFUL:
            let p = action.thresholds.filter(t=>t.name.toLowerCase()==='pending')[0];
            let u = action.thresholds.filter(t=>t.name.toLowerCase()==='update')[0];
            let d = action.thresholds.filter(t=>t.name.toLowerCase()==='delete')[0];
            newState.pendingThreshold = p;
            newState.updateThreshold = u;
            newState.deleteThreshold = d;
            break;
        case UPDATE_THRESHOLD_SUCCESFUL:
            break;
        case CREATE_REASON:
            break;
        case LOAD_USERSINFO_SUCCESFUL:
            newState.usersInfo=action.usersInfo
            break;
        case LOAD_ONEUSER_SUCCESFUL:
            newState.usersInfo=[action.userInfo]
            break;
        case CLEAR_USER:
            newState.userInfo=[];
            break;
        default:
            break;
    }
    return newState;
}

export default adminReducer