package com.mhp.shared.helper;

import lombok.experimental.UtilityClass;

@UtilityClass
public class UserEndpoints {
    public static final String USER_ROOT = "/user";
    public static final String USER_GET_USERS_EXCEPT_YOU = "/get-users-except-you/{id}";
    public static final String USER_GET_USER_INFO="/get-user-info/{username}";
    public static final String USER_GET_INFOS_ENTER="/get-user-info-enter/{username}";
        
    public static final String USER_ROLE_TO_ADMIN = "/role-to-admin/{id}";
    public static final String USER_ROLE_TO_SUPER_ADMIN = "/role-to-super-admin/{currentSuper}/{newSuper}";
    public static final String USER_ROLE_TO_USER = "/role-to-user/{id}";
}