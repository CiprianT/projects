package com.mhp.shared.mappers;

import com.mhp.shared.dto.UserDto;
import com.mhp.shared.model.UserEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2019-09-04T14:59:21+0300",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_161 (Oracle Corporation)"
)
@Component
public class UserMapperImpl implements UserMapper {

    @Override
    public UserDto toDto(UserEntity entity) {
        if ( entity == null ) {
            return null;
        }

        UserDto userDto = new UserDto();

        photoMappingToDto( userDto, entity );

        userDto.setUserId( entity.getUserId() );
        userDto.setFirstName( entity.getFirstName() );
        userDto.setLastName( entity.getLastName() );
        userDto.setEmail( entity.getEmail() );
        userDto.setDepartment( entity.getDepartment() );
        userDto.setTitle( entity.getTitle() );
        userDto.setUsername( entity.getUsername() );
        userDto.setRole( entity.getRole() );

        return userDto;
    }

    @Override
    public UserEntity toEntity(UserDto dto) {
        if ( dto == null ) {
            return null;
        }

        UserEntity userEntity = new UserEntity();

        photoMappingToEntity( userEntity, dto );
        mapRole( userEntity, dto );

        userEntity.setUserId( dto.getUserId() );
        userEntity.setUsername( dto.getUsername() );
        userEntity.setFirstName( dto.getFirstName() );
        userEntity.setLastName( dto.getLastName() );
        userEntity.setEmail( dto.getEmail() );
        userEntity.setDepartment( dto.getDepartment() );
        userEntity.setTitle( dto.getTitle() );
        userEntity.setRole( dto.getRole() );

        return userEntity;
    }

    @Override
    public List<UserDto> toDtos(List<UserEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<UserDto> list = new ArrayList<UserDto>( entities.size() );
        for ( UserEntity userEntity : entities ) {
            list.add( toDto( userEntity ) );
        }

        return list;
    }

    @Override
    public List<UserEntity> toEntities(List<UserDto> dtos) {
        if ( dtos == null ) {
            return null;
        }

        List<UserEntity> list = new ArrayList<UserEntity>( dtos.size() );
        for ( UserDto userDto : dtos ) {
            list.add( toEntity( userDto ) );
        }

        return list;
    }
}
