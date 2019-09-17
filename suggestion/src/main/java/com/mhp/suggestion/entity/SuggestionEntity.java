package com.mhp.suggestion.entity;

import com.mhp.shared.model.UserEntity;
import com.mhp.suggestion.helper.enums.ESugestionStatus;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.action.internal.OrphanRemovalAction;
import org.hibernate.validator.constraints.Length;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "suggestion")
@Data
@NoArgsConstructor
public class SuggestionEntity {
    public static final String ID = "suggestion_id";
    public static final String TITLE = "title";
    public static final String POST_DATE = "post_date";
    public static final String TEXT = "text";
    public static final String AUTHOR = "author";
    public static final String ANONYMOUS = "anonymous";
    public static final String STATUS = "status";


    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SUGGESTION_GENERATOR")
    @SequenceGenerator(name = "SUGGESTION_GENERATOR", sequenceName = "seq_suggestion", allocationSize = 1)
    @Column(name = ID)
    private Long id;

    @Column(name = TITLE)
    @NotNull(message = "Title cannot be null!")
    @Length(min=4,message = "Title must be 4 characters long.")
    private String title;

    @Column(name = POST_DATE)
    private LocalDateTime postDate;

    @Column(name = TEXT)
    @NotNull(message = "Description cannot be null!")
    @Length(min=4,message = "Description must be at least 4 characters long.")
    private String text;

    @ToString.Exclude
    @ManyToOne
    @JoinColumn(name = AUTHOR, nullable = false)
    @NotNull(message = "Author cannot be null!")
    private UserEntity author;

    @Column(name = ANONYMOUS)
    private Boolean anonymous;

    @Column(name = STATUS)
    private ESugestionStatus status;

    @OneToMany(orphanRemoval = true)
    @JoinColumn(name = "fk_suggestion_id", updatable = false)
    public Set<VoteEntity> votes = new HashSet<>();

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToMany(fetch = FetchType.LAZY, cascade =
            CascadeType.MERGE)
    @JoinTable(name = "suggestion_tag", joinColumns = {@JoinColumn(name = "fk_suggestion_id")},
            inverseJoinColumns = {@JoinColumn(name = "fk_tag_id")})
    private Set<TagsEntity> tags = new HashSet<>();

    @ToString.Exclude
    @EqualsAndHashCode.Exclude
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.PERSIST)
    @JoinTable(
            name = "notification",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "suggestion_id")}
    )
    private Set<UserEntity> users = new HashSet<>();
}
