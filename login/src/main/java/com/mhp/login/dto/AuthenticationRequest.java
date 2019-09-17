package com.mhp.login.dto;

import lombok.Data;
/**
 * @author : rionescu
 */
@Data
public class AuthenticationRequest {

    private String username;
    private String password;
}
