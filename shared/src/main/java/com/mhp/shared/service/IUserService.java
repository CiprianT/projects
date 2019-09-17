package com.mhp.shared.service;


import com.mhp.shared.dto.UserDto;
import com.mhp.shared.helper.EUserRole;
import com.mhp.shared.model.UserEntity;


import java.util.List;

/**
 * @author : rionescu
 */
public interface IUserService {
    UserEntity findByUsername(String username);
    List<UserEntity> getUsersExceptOneById(Integer id);

    void changeRole(Long id, EUserRole role);
    List<UserEntity> getUserEnter(String username);
   List<UserDto> getAllAdmins();
}
