import { combineReducers } from "redux";
import adminReducer from './adminReducer';
import loginReducer from './loginReducer';
import userReducer from './userReducer';
import tagReducer from './tagReducer';
import suggestionReducer from './suggestionReducer';
import notificationReducer from './notificationReducer';

/**
 * @author [Matei] 
 */

const rootReducer = combineReducers({
    suggestionReducer: suggestionReducer,
    tagReducer: tagReducer,
    userReducer: userReducer,
    loginState: loginReducer,
    adminReducer : adminReducer,
    notificationReducer : notificationReducer
});

export default rootReducer