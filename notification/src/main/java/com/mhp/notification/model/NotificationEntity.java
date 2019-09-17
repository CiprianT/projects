package com.mhp.notification.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

/**
 * @author : rionescu
 */
@Entity
@Table(name = "notification")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class NotificationEntity {

    public static final String ID = "notification_id";

    public static final String USER_ID = "user_id";
    public static final String SUGGESTION_ID = "suggestion_id";
    public static final String DESCRIPTION = "description";
    public static final String SEEN = "seen";
    private static final String POST_DATE = "post_date";

    @Id
    @EqualsAndHashCode.Include
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "NOTIFICATION_GENERATOR")
    @SequenceGenerator(name = "NOTIFICATION_GENERATOR", sequenceName = "seq_notification", allocationSize = 1)
    @Column(name = ID)
    private Long notificationId;

    @Column(name = USER_ID)
    private Long userId;

    @Column(name = SUGGESTION_ID)
    private Long suggestionId;

    @Column(name = DESCRIPTION)
    private String description;

    @Column(name = SEEN)
    private Boolean seen;

    @Column(name=POST_DATE)
    private LocalDateTime postDate;
}
