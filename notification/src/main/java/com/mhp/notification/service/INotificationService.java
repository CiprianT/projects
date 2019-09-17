package com.mhp.notification.service;

import com.mhp.notification.dto.NotificationDto;
import com.mhp.notification.model.NotificationEntity;

import java.util.List;

/**
 * @author : rionescu
 */
public interface INotificationService  {

    void saveNotification(Long userId,Long suggestionID,String description);

    List<NotificationEntity> getAllNotifications();

    List<NotificationDto> getNotificationsForUser(Long id);


    void modifyNotificationSeen(Long id);
}
