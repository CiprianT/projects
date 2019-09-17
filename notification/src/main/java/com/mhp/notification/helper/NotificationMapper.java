package com.mhp.notification.helper;

import com.mhp.notification.dto.NotificationDto;
import com.mhp.notification.model.NotificationEntity;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface NotificationMapper {
    NotificationDto toDto(NotificationEntity notificationEntity);
    NotificationEntity toEntity(NotificationDto notificationDto);
    List<NotificationDto> toDtos(List<NotificationEntity> entities);
    List<NotificationEntity> toEntities(List<NotificationDto> entities);


}
