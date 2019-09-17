package com.mhp.notification.helper;

import com.mhp.notification.dto.NotificationDto;
import com.mhp.notification.model.NotificationEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2019-08-29T10:29:19+0300",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_161 (Oracle Corporation)"
)
@Component
public class NotificationMapperImpl implements NotificationMapper {

    @Override
    public NotificationDto toDto(NotificationEntity notificationEntity) {
        if ( notificationEntity == null ) {
            return null;
        }

        NotificationDto notificationDto = new NotificationDto();

        notificationDto.setNotificationId( notificationEntity.getNotificationId() );
        notificationDto.setSuggestionId( notificationEntity.getSuggestionId() );
        notificationDto.setSeen( notificationEntity.getSeen() );
        notificationDto.setDescription( notificationEntity.getDescription() );
        notificationDto.setPostDate( notificationEntity.getPostDate() );

        return notificationDto;
    }

    @Override
    public NotificationEntity toEntity(NotificationDto notificationDto) {
        if ( notificationDto == null ) {
            return null;
        }

        NotificationEntity notificationEntity = new NotificationEntity();

        notificationEntity.setNotificationId( notificationDto.getNotificationId() );
        notificationEntity.setSuggestionId( notificationDto.getSuggestionId() );
        notificationEntity.setDescription( notificationDto.getDescription() );
        notificationEntity.setSeen( notificationDto.getSeen() );
        notificationEntity.setPostDate( notificationDto.getPostDate() );

        return notificationEntity;
    }

    @Override
    public List<NotificationDto> toDtos(List<NotificationEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<NotificationDto> list = new ArrayList<NotificationDto>( entities.size() );
        for ( NotificationEntity notificationEntity : entities ) {
            list.add( toDto( notificationEntity ) );
        }

        return list;
    }

    @Override
    public List<NotificationEntity> toEntities(List<NotificationDto> entities) {
        if ( entities == null ) {
            return null;
        }

        List<NotificationEntity> list = new ArrayList<NotificationEntity>( entities.size() );
        for ( NotificationDto notificationDto : entities ) {
            list.add( toEntity( notificationDto ) );
        }

        return list;
    }
}
