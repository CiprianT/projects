/**
 * @author [Marius Bledea]
 * @param {number} userId 
 */
import swal from 'sweetalert';
import axiosInstance from "../../../../axios/axios";
import { logoutActionCreator } from "../../../login/actionCreators/loginActionCreators";
import { changeRoleToAdminSuccesful, changeRoleToSuperAdminSuccesful, changeRoleToUserSuccesful, loadOneUserInfoActionSuccesful, loadUsersInfoActionSuccesful } from "../actionCreators/superAdminActionSuccesful";
import { CLEAR_USER } from '../actionTypes/superAdminActionTypes';

export const loadUsersInfoActionCreators = (userId) => {
    return dispatch => {
        return axiosInstance
            .get("http://localhost:8080/user/get-users-except-you/" + userId)
            .then(response => {
                const { values: usersInfo } = response.data;
                dispatch(loadUsersInfoActionSuccesful(usersInfo));
            }).catch(err => {
                swal("Oops...", "Could not load users", "info");
            })
    }
}

export const loadOneUserActionCreators=(username) =>{
    return dispatch => {
        return axiosInstance
        .get("http://localhost:8080/user/get-user-info/"+username)
        .then(response=>{
            const userInfo=response.data;
            dispatch(loadOneUserInfoActionSuccesful(userInfo))
        }).catch(err=>{
            swal("Oops...", "Could not find username:"+username, "info");
        })
    }
}

export const clearUser=() =>{
    return {
        type:CLEAR_USER,
    }
}

export const loadUsersEnterActionCreators=(username)=>{
    return dispatch=>{
        return axiosInstance
        .get("http://localhost:8080/user/get-user-info-enter/"+username)
        .then(response=>{
            const{values:usersInfo}=response.data;
            dispatch(loadUsersInfoActionSuccesful(usersInfo))
        }).catch(err=>{
            swal("Oops...", "There was a problem with your username", "info");
        })
    }
}
/**
 * @author [Laura Luca]
 * @param {number} userId 
 */
export const changeRoleToAdminActionCreator = (currentUserId,userId) => {
    return dispatch => {
        return axiosInstance
            .post("http://localhost:8080/user/role-to-admin/" + userId)
            .then(response => {
                dispatch(changeRoleToAdminSuccesful());
                dispatch(loadUsersInfoActionCreators(currentUserId));
            }).catch(err=>{
                swal("Oops...", "Could not elevate this user", "info");
            })
    }
}

/**
 * @author [Laura Luca]
 * @param {number} userId 
 */
export const changeRoleToUserActionCreator = (currentUserId,userId) => {
    return dispatch => {
        return axiosInstance
            .post("http://localhost:8080/user/role-to-user/" + userId)
            .then(response => {
                dispatch(changeRoleToUserSuccesful())
                dispatch(loadUsersInfoActionCreators(currentUserId));
            }).catch(err=>{
                swal("Oops...", "Could not change his role", "info");
            })
    }
}

/**
 * @author [Laura Luca]
 * @param {number,number} userId 
 */
export const changeRoleToSuperAdminActionCreator = (currentUserId, userId) => {
    return dispatch => {
        return axiosInstance
            .post("http://localhost:8080/user/role-to-super-admin/" + currentUserId + "/" + userId)
            .then(response => {
                dispatch(changeRoleToSuperAdminSuccesful())
                dispatch(logoutActionCreator())
            }).catch(err=>{
                swal("Oops...", "Could not elevate to super admin", "info");
            })
    }
}

