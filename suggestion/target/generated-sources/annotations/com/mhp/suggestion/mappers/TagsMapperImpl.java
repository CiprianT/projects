package com.mhp.suggestion.mappers;

import com.mhp.suggestion.dto.TagsDto;
import com.mhp.suggestion.entity.TagsEntity;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2019-08-29T10:29:24+0300",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_161 (Oracle Corporation)"
)
@Component
public class TagsMapperImpl implements TagsMapper {

    @Override
    public List<TagsDto> toDtoList(List<TagsEntity> tagsEntity) {
        if ( tagsEntity == null ) {
            return null;
        }

        List<TagsDto> list = new ArrayList<TagsDto>( tagsEntity.size() );
        for ( TagsEntity tagsEntity1 : tagsEntity ) {
            list.add( toDto( tagsEntity1 ) );
        }

        return list;
    }

    @Override
    public List<TagsEntity> toEntityList(List<TagsDto> tagsDto) {
        if ( tagsDto == null ) {
            return null;
        }

        List<TagsEntity> list = new ArrayList<TagsEntity>( tagsDto.size() );
        for ( TagsDto tagsDto1 : tagsDto ) {
            list.add( toEntity( tagsDto1 ) );
        }

        return list;
    }

    @Override
    public Set<TagsEntity> toEntitySet(List<TagsDto> tagsDto) {
        if ( tagsDto == null ) {
            return null;
        }

        Set<TagsEntity> set = new HashSet<TagsEntity>( Math.max( (int) ( tagsDto.size() / .75f ) + 1, 16 ) );
        for ( TagsDto tagsDto1 : tagsDto ) {
            set.add( toEntity( tagsDto1 ) );
        }

        return set;
    }

    @Override
    public TagsEntity toEntity(TagsDto tagsDto) {
        if ( tagsDto == null ) {
            return null;
        }

        TagsEntity tagsEntity = new TagsEntity();

        tagsEntity.setId( tagsDto.getId() );
        tagsEntity.setName( tagsDto.getName() );

        return tagsEntity;
    }

    @Override
    public TagsDto toDto(TagsEntity tagsEntity) {
        if ( tagsEntity == null ) {
            return null;
        }

        TagsDto tagsDto = new TagsDto();

        tagsDto.setId( tagsEntity.getId() );
        tagsDto.setName( tagsEntity.getName() );

        return tagsDto;
    }
}
