package com.mhp.login.service;

import com.mhp.login.dto.AuthenticationRequest;
import com.mhp.shared.dto.UserDto;
import com.mhp.shared.model.UserEntity;
/**
 * @author : rionescu
 */
public interface IAuthenticationService {

    UserDto getLdapUser(AuthenticationRequest auth);
    UserEntity findUser(AuthenticationRequest auth);

}
