package com.mhp.suggestion.mappers;

import com.mhp.suggestion.dto.ReasonDto;
import com.mhp.suggestion.entity.ReasonEntity;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2019-08-29T10:29:24+0300",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_161 (Oracle Corporation)"
)
@Component
public class ReasonMapperImpl implements ReasonMapper {

    @Override
    public ReasonEntity toEntity(ReasonDto reasonDto) {
        if ( reasonDto == null ) {
            return null;
        }

        ReasonEntity reasonEntity = new ReasonEntity();

        reasonEntity.setSuggestionId( reasonDto.getSuggestionId() );
        reasonEntity.setReason( reasonDto.getReason() );
        reasonEntity.setTitle( reasonDto.getTitle() );
        reasonEntity.setDeclined( reasonDto.getDeclined() );

        return reasonEntity;
    }

    @Override
    public ReasonDto toDto(ReasonEntity reasonEntity) {
        if ( reasonEntity == null ) {
            return null;
        }

        ReasonDto reasonDto = new ReasonDto();

        reasonDto.setSuggestionId( reasonEntity.getSuggestionId() );
        reasonDto.setReason( reasonEntity.getReason() );
        reasonDto.setTitle( reasonEntity.getTitle() );
        reasonDto.setDeclined( reasonEntity.getDeclined() );

        return reasonDto;
    }
}
