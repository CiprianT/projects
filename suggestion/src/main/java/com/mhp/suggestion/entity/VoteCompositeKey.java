package com.mhp.suggestion.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import java.io.Serializable;

@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoteCompositeKey implements Serializable {
    @Column(name = "fk_user_id")
    private Long userId;
    @Column(name = "fk_suggestion_id")
    private Long suggestionId;
}
