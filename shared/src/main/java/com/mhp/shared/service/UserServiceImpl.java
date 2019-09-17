package com.mhp.shared.service;

import com.mhp.shared.dto.UserDto;
import com.mhp.shared.helper.EUserRole;
import com.mhp.shared.mappers.UserMapper;
import com.mhp.shared.model.UserEntity;
import com.mhp.shared.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author : rionescu
 */
@Service
public class UserServiceImpl implements IUserService {
    private UserRepository userRepository;
    private UserMapper userMapper;

    @Override
    public List<UserEntity> getUserEnter(String username) {
        return userRepository.getUsersALike(username);
    }

    @Autowired
    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserEntity findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    @Override
    public List<UserEntity> getUsersExceptOneById(Integer id) {

        return userRepository.getUsersExceptOneById(id);
    }

    @Override
    public List<UserDto> getAllAdmins() {

        return userMapper.toDtos(userRepository.getAdmins());
    }


    @Override

    public void changeRole(Long id, EUserRole role) {
        UserEntity user = userRepository.getOne(id);
        user.setRole(role);
        userRepository.save(user);
    }

}
