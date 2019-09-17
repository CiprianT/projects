package com.mhp.suggestion.mappers;

import com.mhp.shared.model.UserEntity;
import com.mhp.shared.repository.UserRepository;
import com.mhp.suggestion.dto.SuggestionCreateDto;
import com.mhp.suggestion.dto.SuggestionDto;
import com.mhp.suggestion.dto.TagsDto;
import com.mhp.suggestion.entity.SuggestionEntity;
import com.mhp.suggestion.entity.TagsEntity;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import javax.annotation.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2019-08-29T10:29:24+0300",
    comments = "version: 1.3.0.Final, compiler: javac, environment: Java 1.8.0_161 (Oracle Corporation)"
)
@Component
public class SuggestionMapperImpl implements SuggestionMapper {

    @Autowired
    private TagsMapper tagsMapper;

    @Override
    public SuggestionDto toDto(SuggestionEntity entity) {
        if ( entity == null ) {
            return null;
        }

        SuggestionDto suggestionDto = new SuggestionDto();

        photoMappingToDto( suggestionDto, entity );

        suggestionDto.setAuthor( entityAuthorUserId( entity ) );
        suggestionDto.setId( entity.getId() );
        suggestionDto.setTitle( entity.getTitle() );
        suggestionDto.setPostDate( entity.getPostDate() );
        suggestionDto.setText( entity.getText() );
        suggestionDto.setStatus( entity.getStatus() );
        suggestionDto.setTags( tagsEntitySetToTagsDtoSet( entity.getTags() ) );

        mapSuggestion( suggestionDto, entity );

        return suggestionDto;
    }

    @Override
    public List<SuggestionDto> toDtos(List<SuggestionEntity> entities) {
        if ( entities == null ) {
            return null;
        }

        List<SuggestionDto> list = new ArrayList<SuggestionDto>( entities.size() );
        for ( SuggestionEntity suggestionEntity : entities ) {
            list.add( toDto( suggestionEntity ) );
        }

        return list;
    }

    @Override
    public SuggestionEntity toEntity(SuggestionDto suggestionDto, UserRepository userRepository) {
        if ( suggestionDto == null ) {
            return null;
        }

        SuggestionEntity suggestionEntity = new SuggestionEntity();

        photoMappingToEntity( suggestionEntity, suggestionDto );

        suggestionEntity.setId( suggestionDto.getId() );
        suggestionEntity.setTitle( suggestionDto.getTitle() );
        suggestionEntity.setPostDate( suggestionDto.getPostDate() );
        suggestionEntity.setText( suggestionDto.getText() );
        suggestionEntity.setStatus( suggestionDto.getStatus() );
        suggestionEntity.setTags( tagsDtoSetToTagsEntitySet( suggestionDto.getTags(), userRepository ) );

        mapEntity( suggestionEntity, suggestionDto );

        return suggestionEntity;
    }

    @Override
    public SuggestionEntity toEntity(SuggestionCreateDto suggestionCreateDto) {
        if ( suggestionCreateDto == null ) {
            return null;
        }

        SuggestionEntity suggestionEntity = new SuggestionEntity();

        suggestionEntity.setAuthor( suggestionCreateDtoToUserEntity( suggestionCreateDto ) );
        suggestionEntity.setTitle( suggestionCreateDto.getTitle() );
        suggestionEntity.setText( suggestionCreateDto.getText() );
        suggestionEntity.setAnonymous( suggestionCreateDto.getAnonymous() );
        suggestionEntity.setTags( tagsMapper.toEntitySet( suggestionCreateDto.getTags() ) );

        return suggestionEntity;
    }

    @Override
    public SuggestionCreateDto toCreateDto(SuggestionEntity suggestionEntity) {
        if ( suggestionEntity == null ) {
            return null;
        }

        SuggestionCreateDto suggestionCreateDto = new SuggestionCreateDto();

        suggestionCreateDto.setAuthor( entityAuthorUserId( suggestionEntity ) );
        suggestionCreateDto.setTitle( suggestionEntity.getTitle() );
        suggestionCreateDto.setText( suggestionEntity.getText() );
        suggestionCreateDto.setTags( tagsEntitySetToTagsDtoArrayList( suggestionEntity.getTags() ) );
        suggestionCreateDto.setAnonymous( suggestionEntity.getAnonymous() );

        mapSuggestionCreateDtoToEntity( suggestionCreateDto, suggestionEntity );

        return suggestionCreateDto;
    }

    private Long entityAuthorUserId(SuggestionEntity suggestionEntity) {
        if ( suggestionEntity == null ) {
            return null;
        }
        UserEntity author = suggestionEntity.getAuthor();
        if ( author == null ) {
            return null;
        }
        Long userId = author.getUserId();
        if ( userId == null ) {
            return null;
        }
        return userId;
    }

    protected Set<TagsDto> tagsEntitySetToTagsDtoSet(Set<TagsEntity> set) {
        if ( set == null ) {
            return null;
        }

        Set<TagsDto> set1 = new HashSet<TagsDto>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( TagsEntity tagsEntity : set ) {
            set1.add( tagsMapper.toDto( tagsEntity ) );
        }

        return set1;
    }

    protected Set<TagsEntity> tagsDtoSetToTagsEntitySet(Set<TagsDto> set, UserRepository userRepository) {
        if ( set == null ) {
            return null;
        }

        Set<TagsEntity> set1 = new HashSet<TagsEntity>( Math.max( (int) ( set.size() / .75f ) + 1, 16 ) );
        for ( TagsDto tagsDto : set ) {
            set1.add( tagsMapper.toEntity( tagsDto ) );
        }

        return set1;
    }

    protected UserEntity suggestionCreateDtoToUserEntity(SuggestionCreateDto suggestionCreateDto) {
        if ( suggestionCreateDto == null ) {
            return null;
        }

        UserEntity userEntity = new UserEntity();

        userEntity.setUserId( suggestionCreateDto.getAuthor() );

        return userEntity;
    }

    protected ArrayList<TagsDto> tagsEntitySetToTagsDtoArrayList(Set<TagsEntity> set) {
        if ( set == null ) {
            return null;
        }

        ArrayList<TagsDto> arrayList = new ArrayList<TagsDto>();
        for ( TagsEntity tagsEntity : set ) {
            arrayList.add( tagsMapper.toDto( tagsEntity ) );
        }

        return arrayList;
    }
}
