package com.mhp.suggestion.helper.enums;
import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
public enum EUserPreference {
    LIKED(1),
    DISLIKED(-1),
    NEUTRAL(0);

    private static Map<Integer,EUserPreference> userPreferenceMap = new HashMap<>(3);
    static {
        userPreferenceMap.put(LIKED.getStatus(), LIKED);
        userPreferenceMap.put(DISLIKED.getStatus(), DISLIKED);
        userPreferenceMap.put(NEUTRAL.getStatus(), NEUTRAL);
    }

    public int getStatus() {
        return status;
    }

    private int status;

    @JsonCreator
    public static EUserPreference forValue(Integer value) {
        return userPreferenceMap.get(value);
    }

    @JsonValue
    public Integer toValue() {
        for (Map.Entry<Integer, EUserPreference> entry : userPreferenceMap.entrySet()) {
            if (entry.getValue() == this)
                return entry.getKey();
        }

        return null; // or fail
    }
}
