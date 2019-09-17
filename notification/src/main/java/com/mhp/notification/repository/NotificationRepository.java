package com.mhp.notification.repository;

import com.mhp.notification.model.NotificationEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

/**
 * @author : rionescu
 */
@Repository
public interface NotificationRepository  extends JpaRepository<NotificationEntity, Long> {

    @Query(value="SELECT * FROM notification n where n.user_id=:userId ORDER BY n.post_date desc",nativeQuery = true)
    List<NotificationEntity> getNotificationsForUser(@Param("userId")Long userId);

    @Transactional
    @Modifying
    @Query(value="UPDATE notification SET seen=true where user_id=:userId",nativeQuery = true)
    void markNotificationsSeenForUser(@Param("userId")Long userId);


    @Transactional
    @Modifying
    @Query(value = "DELETE FROM notification n WHERE (date_part('day', NOW()) - date_part('day', n.post_date)) >= 14", nativeQuery = true)
    public void deleteOldNotifications();
}
