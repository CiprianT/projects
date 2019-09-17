package com.mhp.suggestion.entity;

import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * @author Laura Luca
 */
@Entity
@Table(name = "tresholds")
@Data
@NoArgsConstructor
public class ThresholdEntity {
    private static final String ID = "treshold_id";
    private static final String NAME = "name";
    private static final String DESCRIPTION = "description";
    private static final String VALUE = "value";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "THRESHOLDS_GENERATOR")
    @SequenceGenerator(name = "THRESHOLDS_GENERATOR", sequenceName = "seq_treshold", allocationSize = 1)
    @Column(name = ID)
    private Long id;

    @Column(name = NAME)
    @NotNull(message = "Threshold name cannot be null.")
    private String name;

    @Column(name = DESCRIPTION)
    private String description;

    @Column(name = VALUE)
    private Long value;


}
