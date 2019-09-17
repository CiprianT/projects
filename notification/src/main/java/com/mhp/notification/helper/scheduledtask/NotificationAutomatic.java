package com.mhp.notification.helper.scheduledtask;

import com.mhp.notification.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import javax.transaction.Transactional;

@Component
public class NotificationAutomatic {
    private NotificationRepository notificationRepository;

    @Autowired
    public NotificationAutomatic(NotificationRepository notificationRepository) {
        this.notificationRepository = notificationRepository;
    }

    @Scheduled(cron = "0/5 * * * * *")
    @Transactional
    public void deleteOldNotifications() {
        notificationRepository.deleteOldNotifications();
    }
}
