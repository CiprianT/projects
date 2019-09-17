package com.mhp.suggestion.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Column;
import javax.persistence.EmbeddedId;
import javax.persistence.Entity;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name = "vote")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoteEntity {
    @EmbeddedId
    private VoteCompositeKey voteId;

    @Column(name = "preference")
    @NotNull
    private Integer preference;
}
