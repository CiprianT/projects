package com.mhp.suggestion.helper;

import lombok.experimental.UtilityClass;

@UtilityClass
public class SuggestionEndpoints {
    public static final String SUGGESTION_ROOT ="/suggestion-service";
    public static final String SUGESSTION_GET_ALL ="/get-all/{status}";
    public static final String SUGGESTION_GET_BY_USER ="/get-by-user/{offset}/{userId}";
    public static final String SUGESSTION_POST_CREATE ="/create-suggestion";
    public static final String SUGGESTION_GET_SUGGESTIONS_OFFSET_DATE="/get-suggestions-offset-date/{offset}/{status}";
    public static final String SUGGESTION_GET_SUGGETIONS_OFFSET_SCORE="/get-suggestions-offset-score/{offset}/{status}";

    public static final String SUGGESTION_GET_TITLES="/get-titles/{status}";
    public static final String SUGGESTION_GET_BY_TITLE="/get-by-title/{title}";
    public static final String SUGGESTION_GET_TITLE_BY_USER="/get-title-by-user/{userId}";
    public static final String SUGGESTION_GET_BY_PREFERENCE = "/get-by-preference/{status}";
    public static final String SUGGESTION_DELETE = "/delete-suggestion/{id}";
    public static final String SUGGESTION_UPDATE = "/update";


    public static final String SUGGESTION_GET_BY_USER_SCORE="/get-by-user-score/{offset}/{userId}";
    public static final String SUGGESTION_GET_BY_TITLE_ENTER = "/get-on-enter/{status}/{title}";
    public static final String SUGGESTION_GET_BY_TITLE_AND_ID_ENTER = "/get-on-enter-by-user-and-title/{userId}/{title}";
    public static final String GET_ALL_BY_TAGS = "/get-by-tags/{status}";
}
