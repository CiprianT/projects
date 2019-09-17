import { CHANGE_ROLE_TO_ADMIN_SUCCESFUL, CHANGE_ROLE_TO_SUPER_ADMIN_SUCCESFUL, CHANGE_ROLE_TO_USER_SUCCESFUL, LOAD_ONEUSER_SUCCESFUL, LOAD_USERSINFO_SUCCESFUL } from "../actionTypes/superAdminActionTypes";

/**
 * @author [Marius Bledea]
 * @param {number} userId 
 */
export const loadUsersInfoActionSuccesful=(usersInfo)=>{
    return {
        type:LOAD_USERSINFO_SUCCESFUL,
        usersInfo:usersInfo,
    }
}
export const loadOneUserInfoActionSuccesful=(userInfo)=>{
    return {
        
        type:LOAD_ONEUSER_SUCCESFUL,
        userInfo:userInfo,
    }}

export const changeRoleToAdminSuccesful =()=>{
    return{
        type:CHANGE_ROLE_TO_ADMIN_SUCCESFUL,
    }
}

export const changeRoleToUserSuccesful = ()=>{
    return {
        type:CHANGE_ROLE_TO_USER_SUCCESFUL
    }
}

export const changeRoleToSuperAdminSuccesful = ()=>{
    return{
        type:CHANGE_ROLE_TO_SUPER_ADMIN_SUCCESFUL
    }
}