package com.mhp.suggestion.entity;

import com.sun.org.apache.xpath.internal.operations.Bool;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;

/**
 * @author : rionescu
 */

@Entity
@Table(name = "reason")
@Data
@NoArgsConstructor
public class ReasonEntity {

    public static final String ID = "reason_id";
    public static final String REASON = "reason";
    public static final String SUGGESTION_ID = "suggestion_id";
    public static final String TITLE = "title";
    public static final String DECLINED = "declined";

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "REASON_GENERATOR")
    @SequenceGenerator(name = "REASON_GENERATOR", sequenceName = "seq_reason", allocationSize = 1)
    @Column(name = ID)
    private Long reasonId;

    @Column(name = SUGGESTION_ID)
    private Long suggestionId;

    @Column(name = REASON)
    private String reason;

    @Column(name = TITLE)
    private String title;

    @Column(name = DECLINED)
    private Boolean declined;

    public ReasonEntity(String reason, Long suggestionId, String title, Boolean declined){
        this.suggestionId = suggestionId;
        this.reason = reason;
        this.title = title;
        this.declined = declined;
    }
}
