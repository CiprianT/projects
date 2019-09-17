package com.mhp.suggestion.mappers;

import com.mhp.suggestion.dto.ThresholdDto;
import com.mhp.suggestion.entity.ThresholdEntity;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2019-08-29T10:29:24+0300",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_161 (Oracle Corporation)"
)
@Component
public class ThresholdMapperImpl implements ThresholdMapper {

    @Override
    public List<ThresholdDto> toDtoList(List<ThresholdEntity> thresholdsEntities) {
        if ( thresholdsEntities == null ) {
            return null;
        }

        List<ThresholdDto> list = new ArrayList<ThresholdDto>( thresholdsEntities.size() );
        for ( ThresholdEntity thresholdEntity : thresholdsEntities ) {
            list.add( toDto( thresholdEntity ) );
        }

        return list;
    }

    @Override
    public List<ThresholdEntity> toEntityList(List<ThresholdDto> thresholdDtos) {
        if ( thresholdDtos == null ) {
            return null;
        }

        List<ThresholdEntity> list = new ArrayList<ThresholdEntity>( thresholdDtos.size() );
        for ( ThresholdDto thresholdDto : thresholdDtos ) {
            list.add( toEntity( thresholdDto ) );
        }

        return list;
    }

    @Override
    public ThresholdEntity toEntity(ThresholdDto thresholdDto) {
        if ( thresholdDto == null ) {
            return null;
        }

        ThresholdEntity thresholdEntity = new ThresholdEntity();

        thresholdEntity.setId( thresholdDto.getId() );
        thresholdEntity.setName( thresholdDto.getName() );
        thresholdEntity.setDescription( thresholdDto.getDescription() );
        thresholdEntity.setValue( thresholdDto.getValue() );

        return thresholdEntity;
    }

    @Override
    public ThresholdDto toDto(ThresholdEntity thresholdEntity) {
        if ( thresholdEntity == null ) {
            return null;
        }

        ThresholdDto thresholdDto = new ThresholdDto();

        thresholdDto.setId( thresholdEntity.getId() );
        thresholdDto.setName( thresholdEntity.getName() );
        thresholdDto.setDescription( thresholdEntity.getDescription() );
        thresholdDto.setValue( thresholdEntity.getValue() );

        return thresholdDto;
    }
}
