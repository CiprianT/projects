package com.mhp.login.service;

import com.mhp.login.dto.AuthenticationRequest;
import com.mhp.shared.dto.UserDto;
import com.mhp.shared.helper.EUserRole;
import com.mhp.shared.model.UserEntity;
import com.mhp.shared.repository.UserRepository;
import com.mhp.shared.mappers.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
/**
 * @author : rionescu
 */
@Service
public class AuthenticationService implements IAuthenticationService {

    @Value("${ldap.user.url}")
    private String getLdapUserUrl;

    private UserMapper mapper;
    private UserRepository userRepository;

    @Autowired
    public AuthenticationService(UserMapper mapper, UserRepository userRepository) {
        this.mapper = mapper;
        this.userRepository = userRepository;
    }


    @Override
    public UserDto getLdapUser(AuthenticationRequest auth) {
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<UserDto> ldapUser;
        try {
            ldapUser = restTemplate.postForEntity(getLdapUserUrl, auth, UserDto.class);
            UserDto user = ldapUser.getBody();
            return user;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }


    @Override
    public UserEntity findUser(AuthenticationRequest auth) {
        UserDto ldapUser = getLdapUser(auth);
        UserEntity user = null;
        if(ldapUser != null){
            user = userRepository.findByUsername(ldapUser.getUsername());
            if(user == null){
                ldapUser.setRole(EUserRole.USER);
                user = userRepository.save(mapper.toEntity(ldapUser));

            }
        }
        return user;
    }

}
