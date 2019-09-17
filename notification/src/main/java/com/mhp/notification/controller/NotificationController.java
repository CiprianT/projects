package com.mhp.notification.controller;


import com.mhp.notification.dto.NotificationDto;
import com.mhp.notification.endpoints.NotificationEndpoints;
import com.mhp.notification.service.INotificationService;
import com.mhp.shared.dto.ListDto;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;
@RequestMapping(NotificationEndpoints.NOTIFICATION_ROOT)
@RestController
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class NotificationController  {
private INotificationService notificationService;

    @Autowired
    public NotificationController(INotificationService notificationService) {
        this.notificationService = notificationService;
    }
    @GetMapping(value = NotificationEndpoints.NOTIFICATIONS_GET_MINE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<NotificationDto>> getMyNotifications(@PathVariable Long userId){
        return new ResponseEntity<>(new ListDto(notificationService.getNotificationsForUser(userId)), HttpStatus.OK);
    }
    @GetMapping(value = NotificationEndpoints.NOTIFICATION_MARK_AS_SEEN, produces = APPLICATION_JSON_VALUE)
    public  ResponseEntity<ListDto<NotificationDto>> markAsSeen(@PathVariable Long userId){
        notificationService.modifyNotificationSeen(userId);
        return new ResponseEntity<>(new ListDto(notificationService.getNotificationsForUser(userId)), HttpStatus.OK);
    }

}
