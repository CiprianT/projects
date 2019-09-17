package com.mhp.suggestion.helper;

import lombok.experimental.UtilityClass;

/**
 * @author cteisanu
 */
@UtilityClass
public class VoteEndpoints {
    public final static String VOTE_ROOT = "/vote-service";
    public final static String VOTE_SAVE = "/vote-save";
    public final static String VOTE_DELETE= "/vote-delete/{userId}/{suggestionId}";
}
