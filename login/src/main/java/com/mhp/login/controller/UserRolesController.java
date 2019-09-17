package com.mhp.login.controller;
import com.mhp.shared.dto.ListDto;
import com.mhp.shared.helper.EUserRole;
import com.mhp.shared.helper.UserEndpoints;
import com.mhp.shared.model.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import com.mhp.shared.service.IUserService;
import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RequestMapping(UserEndpoints.USER_ROOT)
@RestController
@PreAuthorize("isAuthenticated() && hasAuthority('SUPER_ADMIN')")
public class UserRolesController {
    private IUserService  userService;

    @Autowired
    public UserRolesController(IUserService userService) {
        this.userService = userService;
    }

    @GetMapping(value=UserEndpoints.USER_GET_USERS_EXCEPT_YOU,produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<UserEntity>> getUsersExceptYou(@PathVariable("id") Integer id)
    {
        return new ResponseEntity<>(new ListDto<>(userService.getUsersExceptOneById(id)), HttpStatus.OK);
    }

    @GetMapping(value=UserEndpoints.USER_GET_USER_INFO,produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<UserEntity> getUserInfo(@PathVariable("username") String username)
    {
        return new ResponseEntity<>(userService.findByUsername(username),HttpStatus.OK);
    }
    @GetMapping(value=UserEndpoints.USER_GET_INFOS_ENTER,produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<UserEntity>> getUsersEnter(@PathVariable("username") String username)
    {
        return new ResponseEntity<>(new ListDto<>(userService.getUserEnter(username)),HttpStatus.OK);
    }

    @PostMapping(value=UserEndpoints.USER_ROLE_TO_USER)
    public ResponseEntity changeRoleToUser(@PathVariable  Long id){
        userService.changeRole(id, EUserRole.USER);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(value = UserEndpoints.USER_ROLE_TO_ADMIN)
    public ResponseEntity changeRoleToAdmin(@PathVariable Long id){
        userService.changeRole(id,EUserRole.ADMIN);
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(value = UserEndpoints.USER_ROLE_TO_SUPER_ADMIN)
    public ResponseEntity changeRoleToSuperAdmin(@PathVariable Long currentSuper, @PathVariable Long newSuper){
        userService.changeRole(currentSuper,EUserRole.USER);
        userService.changeRole(newSuper,EUserRole.SUPER_ADMIN);
        return new ResponseEntity(HttpStatus.OK);
    }
}
