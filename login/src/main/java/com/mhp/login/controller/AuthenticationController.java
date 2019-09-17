package com.mhp.login.controller;

import com.google.gson.Gson;
import com.mhp.login.dto.AuthenticationRequest;
import com.mhp.login.helper.constants.LoginEndpoints;
import com.mhp.login.service.IAuthenticationService;
import com.mhp.shared.config.JwtTokenProvider;
import com.mhp.shared.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
/**
 * @author : rionescu
 */
@RestController
public class AuthenticationController {

    private IAuthenticationService authService;
    private JwtTokenProvider jwtTokenProvider;

    @Autowired
    public AuthenticationController(IAuthenticationService authService, JwtTokenProvider jwtTokenProvider) {
        this.authService = authService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @PostMapping(value = LoginEndpoints.LOGIN,
            produces = APPLICATION_JSON_VALUE,
            consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<String> login(@RequestBody AuthenticationRequest auth){
        try {
            Gson gson = new Gson();
            UserEntity user = authService.findUser(auth);
            String token = jwtTokenProvider.createToken(user);
            String tokenJson = gson.toJson(token);
            return new ResponseEntity<>(tokenJson, HttpStatus.ACCEPTED);
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid username/password supplied.");
        }
    }
}
