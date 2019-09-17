package com.mhp.notification.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * @author : rionescu
 */
@Data
@EqualsAndHashCode
@AllArgsConstructor
@NoArgsConstructor
public class NotificationDto {

    private Long notificationId;
    private Long suggestionId;
    private Boolean seen;
    private String description;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy,HH:mm")
    private LocalDateTime postDate;

}
