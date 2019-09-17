package com.mhp.shared.dto;

import com.mhp.shared.helper.EUserRole;
import lombok.Data;
import lombok.EqualsAndHashCode;
/**
 * @author : rionescu
 */
@Data
@EqualsAndHashCode
public class UserDto {

    private Long userId;
    private String firstName;
    private String lastName;
    private String email;
    private String department;
    private String title;
    private String username;
    private String photo;
    private EUserRole role;

}
