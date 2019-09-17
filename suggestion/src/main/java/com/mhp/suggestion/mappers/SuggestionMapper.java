package com.mhp.suggestion.mappers;

import com.mhp.shared.dto.UserDto;
import com.mhp.shared.helper.EUserRole;
import com.mhp.shared.mappers.UserMapper;
import com.mhp.suggestion.dto.SuggestionCreateDto;
import com.mhp.suggestion.dto.SuggestionDto;
import com.mhp.suggestion.entity.SuggestionEntity;
import com.mhp.shared.model.UserEntity;
import com.mhp.suggestion.entity.VoteEntity;
import com.mhp.suggestion.helper.enums.ESugestionStatus;
import com.mhp.suggestion.helper.enums.EUserPreference;
import com.mhp.suggestion.repository.SuggestionRepository;
import org.apache.commons.lang3.ArrayUtils;
import org.mapstruct.*;
import com.mhp.shared.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;


/**
 * @author cteisanu
 */
@Mapper(componentModel = "spring", uses = TagsMapper.class)
public interface SuggestionMapper {
    @Mappings({
            @Mapping(target = "firstAndLastName", ignore = true),
            @Mapping(target = "author", source = "author.userId")
    })
    SuggestionDto toDto(SuggestionEntity entity);

    List<SuggestionDto> toDtos(List<SuggestionEntity> entities);

    @Mapping(target = "author", ignore = true)
    SuggestionEntity toEntity(SuggestionDto suggestionDto, @Context UserRepository userRepository);


    @AfterMapping
    default void mapSuggestion(@MappingTarget SuggestionDto suggestionDto, SuggestionEntity suggestion) {
        UserEntity loggedUser = (UserEntity) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (suggestion.getAnonymous().equals(true)) {
            suggestionDto.setFirstAndLastName("Anonymous");
        } else {
            suggestionDto.setFirstAndLastName(suggestion.getAuthor().getFirstName() + " " + suggestion.getAuthor().getLastName());
        }
        suggestionDto.setScore(suggestion.getVotes().stream().reduce(0, (score, vote) -> score + vote.getPreference(), Integer::sum));

        VoteEntity loggedUsersVote = suggestion.getVotes().stream().filter((vote) -> vote.getVoteId().getUserId().equals(loggedUser.getUserId())).findAny().orElse(null);
        if(loggedUsersVote != null) {
            if (loggedUsersVote.getPreference().equals(1)) {
                suggestionDto.setUserPreference(EUserPreference.LIKED);
            } else if(loggedUsersVote.getPreference().equals(-1)){
                suggestionDto.setUserPreference(EUserPreference.DISLIKED);
            }else{
                suggestionDto.setUserPreference(EUserPreference.NEUTRAL);
            }
        }else{
            suggestionDto.setUserPreference(EUserPreference.NEUTRAL);
        }
    }

    @AfterMapping
    default void mapEntity(@MappingTarget SuggestionEntity suggestionEntity, SuggestionDto suggestionDto) {
        if (suggestionDto.getFirstAndLastName().equals("Anonymous")) {
            suggestionEntity.setAnonymous(Boolean.TRUE);
        } else {
            suggestionEntity.setAnonymous(Boolean.FALSE);
        }
    }


    @Mapping(source = "author", target="author.userId")
    SuggestionEntity toEntity(SuggestionCreateDto suggestionCreateDto);

    @Mapping(target = "author", source="author.userId")
    SuggestionCreateDto toCreateDto(SuggestionEntity suggestionEntity);


    @AfterMapping
    default void mapSuggestionCreateDtoToEntity(@MappingTarget SuggestionCreateDto suggestionCreateDto, SuggestionEntity suggestionEntity) {
        suggestionEntity.setStatus(ESugestionStatus.ACTIVE);
    }

    @BeforeMapping
    default void photoMappingToDto(@MappingTarget SuggestionDto target, SuggestionEntity source) {
        if(source.getAuthor().getPhoto() != null) {
            if (source.getAuthor().getPhoto().length == 0) {
                target.setPhoto(null);
            } else {
                target.setPhoto(new String(source.getAuthor().getPhoto()));
            }
        }
    }

    @BeforeMapping
    default void photoMappingToEntity(@MappingTarget SuggestionEntity target, SuggestionDto source) {
        if(source.getPhoto() == null ){
            target.getAuthor().setPhoto(null);
        } else {
            target.getAuthor().setPhoto(source.getPhoto().getBytes());
        }
    }

}
