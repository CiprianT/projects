package com.mhp.shared.mappers;

import com.mhp.shared.dto.UserDto;
import com.mhp.shared.helper.EUserRole;
import com.mhp.shared.model.UserEntity;
import org.mapstruct.BeforeMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;

import java.util.List;

/**
 * @author : rionescu
 */
@Mapper(componentModel = "spring")
public interface UserMapper {

    @BeforeMapping
    default void photoMappingToDto(@MappingTarget UserDto target, UserEntity source) {
        if(source.getPhoto()==null ||  source.getPhoto().length == 0 ){
            target.setPhoto(null);
        } else {
            target.setPhoto(new String(source.getPhoto()));
        }
    }

    @BeforeMapping
    default void photoMappingToEntity(@MappingTarget UserEntity target, UserDto source) {
        if(source.getPhoto() == null ){
            target.setPhoto(null);
        } else {
            target.setPhoto(source.getPhoto().getBytes());
        }
    }
    @BeforeMapping
    default void mapRole(@MappingTarget UserEntity target,UserDto source)
    {
        if(source.getRole()==null)
            target.setRole(EUserRole.USER);
    }

    @Mapping(target = "photo", ignore = true)
    UserDto toDto(UserEntity entity);

    @Mapping(target = "photo", ignore = true)
    UserEntity toEntity(UserDto dto);


    List<UserDto> toDtos(List<UserEntity>entities);

    List<UserEntity>toEntities(List<UserDto>dtos);

}
