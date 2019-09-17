package com.mhp.suggestion.mappers;

import com.mhp.suggestion.dto.ReasonDto;
import com.mhp.suggestion.dto.ThresholdDto;
import com.mhp.suggestion.entity.ReasonEntity;
import com.mhp.suggestion.entity.ThresholdEntity;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;


/**
 * @author : rionescu
 */
@Mapper(componentModel = "spring")
public interface ReasonMapper {

    ReasonEntity toEntity (ReasonDto reasonDto);
    ReasonDto toDto(ReasonEntity reasonEntity);
}
