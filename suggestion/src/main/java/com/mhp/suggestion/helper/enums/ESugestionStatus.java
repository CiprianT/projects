package com.mhp.suggestion.helper.enums;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.apache.commons.lang3.StringUtils;

import java.util.HashMap;
import java.util.Map;

@AllArgsConstructor
public enum ESugestionStatus {
    ACTIVE(0),
    PENDING(1),
    ACCEPTED(2),
    DECLINED(3),
    IMPLEMENTED(4),
    MINE(5);

    private static Map<Integer, ESugestionStatus> sugestionMap = new HashMap<Integer, ESugestionStatus>(3);
    static {
        sugestionMap.put(ACTIVE.getStatus(), ACTIVE);
        sugestionMap.put(PENDING.getStatus(), PENDING);
        sugestionMap.put(ACCEPTED.getStatus(), ACCEPTED);
        sugestionMap.put(DECLINED.getStatus(), DECLINED);
        sugestionMap.put(IMPLEMENTED.getStatus(), IMPLEMENTED);
        sugestionMap.put(MINE.getStatus(), MINE);
    }

    @Getter
    private int status;

    @JsonCreator
    public static ESugestionStatus forValue(Integer value) {
        return sugestionMap.get(value);
    }

    @JsonValue
    public Integer toValue() {
        for (Map.Entry<Integer, ESugestionStatus> entry : sugestionMap.entrySet()) {
            if (entry.getValue() == this)
                return entry.getKey();
        }

        return null; // or fail
    }

}