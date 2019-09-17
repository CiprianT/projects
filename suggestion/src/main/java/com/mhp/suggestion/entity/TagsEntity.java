package com.mhp.suggestion.entity;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import org.apache.commons.lang3.builder.ToStringExclude;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

/**
 * @author marius
 */
@Entity
@Table(name = "tag")
@Data
@NoArgsConstructor
public class TagsEntity {
    public static final String ID = "tag_id";
    public static final String NAME = "name";

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "TAGS_GENERATOR")
    @SequenceGenerator(name = "TAGS_GENERATOR", sequenceName = "seq_tag", allocationSize = 1)
    @Column(name = ID)
    private Long id;

    @Column(name = NAME)
    @NotNull(message = "Tag name cannot be null.")
    private String name;


}
