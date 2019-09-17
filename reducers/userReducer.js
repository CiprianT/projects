import { LOGGED_USER, LOGOUT_USER } from "../containers/login/actionTypes/loginActionTypes";

/**
 * @author [Matei]
 */

const initialUserState = {
    user: {
        department: "",
        email: "",
        exp: 0,
        firstName: "",
        iat: 0,
        id: 0,
        lastName: "",
        sub: "",
        title: "",
        
    }
}

const userReducer = (state = initialUserState, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOGGED_USER:
            newState.user = action.user;
            break;
        case LOGOUT_USER:
            newState.user = action.user;
            break;
        default:
            break;
    }
    return newState;
}

export default userReducer