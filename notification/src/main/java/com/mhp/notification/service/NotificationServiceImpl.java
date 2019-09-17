package com.mhp.notification.service;

import com.mhp.notification.dto.NotificationDto;
import com.mhp.notification.helper.NotificationMapper;
import com.mhp.notification.model.NotificationEntity;
import com.mhp.notification.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@ComponentScan("com.mhp.notification.service")
public class NotificationServiceImpl implements INotificationService {
    private NotificationRepository notificationRepository;
    private final SimpMessagingTemplate simpMessagingTemplate;
    List<Long> connectedUsersId;
    private NotificationMapper notificationMapper;


    @Autowired
    public NotificationServiceImpl(NotificationRepository notificationRepository, SimpMessagingTemplate simpMessagingTemplate, NotificationMapper notificationMapper) {
        this.notificationRepository = notificationRepository;
        this.simpMessagingTemplate = simpMessagingTemplate;
        this.notificationMapper = notificationMapper;
        connectedUsersId = new ArrayList<>();

    }

    @Override
    public void saveNotification(Long userId, Long suggestionID, String description) {
        NotificationEntity notificationEntity = notificationRepository.save(new NotificationEntity(null, userId, suggestionID, description, false, LocalDateTime.now()));
        System.out.println(notificationEntity);
        this.simpMessagingTemplate.convertAndSend("/user/" + userId + "/queue/now", notificationMapper.toDto(notificationEntity));
    }


    @Override
    public List<NotificationEntity> getAllNotifications() {
        return notificationRepository.findAll();
    }


    @Override
    public List<NotificationDto> getNotificationsForUser(Long userId) {
        return notificationMapper.toDtos(notificationRepository.getNotificationsForUser(userId));

    }

    @Override
    public void modifyNotificationSeen(Long userId) {
        notificationRepository.markNotificationsSeenForUser(userId);
    }


}
