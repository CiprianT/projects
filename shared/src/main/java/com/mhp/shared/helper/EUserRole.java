package com.mhp.shared.helper;

import lombok.AllArgsConstructor;
import lombok.Getter;
/**
 * @author : marius
 */

@AllArgsConstructor
public enum EUserRole {
    USER(0),
    ADMIN(1),
    SUPER_ADMIN(2);

    @Getter
    private Integer role;

}
