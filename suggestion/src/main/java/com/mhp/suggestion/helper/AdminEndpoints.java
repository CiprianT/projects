package com.mhp.suggestion.helper;

import lombok.experimental.UtilityClass;

/**
 * @author Laura Luca
 */
@UtilityClass
public class AdminEndpoints {
    public static final String ADMIN_ROOT = "/admin";
    public static final String SUGGESTION_ACCEPTED = "/accepted/{id}";
    public static final String SUGGESTION_DECLINED = "/declined";
    public static final String SUGGESTION_IMPLEMENTED = "/implemented/{id}";
    public static final String THRESHOLD_UPDATE  = "/update-threshold";
    public static final String SUGGESTION_DELETED_REASON = "/delete-suggestion";
}
