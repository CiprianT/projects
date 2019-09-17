import { LOGIN_ERROR } from "../containers/login/actionTypes/loginActionTypes";

/**
 * @author [Matei]
 */

const initialErr = {
    loginError: false
}

const loginReducer = (state = initialErr, action) => {
    const newState = state;
    switch (action.type) {
        case LOGIN_ERROR:
            newState.loginError = action.loginError;
            break;
        default:
            break;
    }
    return newState;
}

export default loginReducer