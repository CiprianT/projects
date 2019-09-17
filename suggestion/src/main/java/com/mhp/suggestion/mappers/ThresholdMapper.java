package com.mhp.suggestion.mappers;

import com.mhp.suggestion.dto.ThresholdDto;
import com.mhp.suggestion.entity.ThresholdEntity;
import org.mapstruct.Mapper;

import java.util.List;

/**
 * @author Laura Luca
 */
@Mapper(componentModel = "spring")
public interface ThresholdMapper {
    List<ThresholdDto> toDtoList(List<ThresholdEntity> thresholdsEntities);
    List<ThresholdEntity> toEntityList(List<ThresholdDto> thresholdDtos);
    ThresholdEntity toEntity (ThresholdDto thresholdDto);
    ThresholdDto toDto(ThresholdEntity thresholdEntity);
}
