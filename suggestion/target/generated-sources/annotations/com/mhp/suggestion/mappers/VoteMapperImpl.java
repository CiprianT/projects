package com.mhp.suggestion.mappers;

import com.mhp.suggestion.dto.VoteDto;
import com.mhp.suggestion.entity.VoteEntity;
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
public class VoteMapperImpl implements VoteMapper {

    @Override
    public VoteEntity toEntity(VoteDto voteDto) {
        if ( voteDto == null ) {
            return null;
        }

        VoteEntity voteEntity = new VoteEntity();

        voteEntity.setPreference( voteDto.getPreference() );

        mapVote( voteEntity, voteDto );

        return voteEntity;
    }

    @Override
    public List<VoteEntity> toEntities(List<VoteDto> dtos) {
        if ( dtos == null ) {
            return null;
        }

        List<VoteEntity> list = new ArrayList<VoteEntity>( dtos.size() );
        for ( VoteDto voteDto : dtos ) {
            list.add( toEntity( voteDto ) );
        }

        return list;
    }

    @Override
    public List<VoteDto> toDtos(List<VoteEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<VoteDto> list = new ArrayList<VoteDto>( entities.size() );
        for ( VoteEntity voteEntity : entities ) {
            list.add( toDto( voteEntity ) );
        }

        return list;
    }

    @Override
    public VoteDto toDto(VoteEntity voteEntity) {
        if ( voteEntity == null ) {
            return null;
        }

        VoteDto voteDto = new VoteDto();

        voteDto.setPreference( voteEntity.getPreference() );

        mapDto( voteDto, voteEntity );

        return voteDto;
    }
}
