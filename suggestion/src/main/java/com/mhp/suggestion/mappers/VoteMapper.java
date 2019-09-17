package com.mhp.suggestion.mappers;

import com.mhp.suggestion.dto.VoteDto;
import com.mhp.suggestion.entity.VoteCompositeKey;
import com.mhp.suggestion.entity.VoteEntity;
import org.mapstruct.*;

import java.util.List;

@Mapper(componentModel = "spring")
public interface VoteMapper {
    @Mapping(target = "voteId", ignore = true)
    VoteEntity toEntity(VoteDto voteDto);

    List<VoteEntity> toEntities(List<VoteDto> dtos);

    List<VoteDto> toDtos(List<VoteEntity> entities);

    @AfterMapping
    default void mapVote(@MappingTarget VoteEntity voteEntity, VoteDto voteDto) {
        voteEntity.setVoteId(new VoteCompositeKey(voteDto.getUserId(), voteDto.getSuggestionId()));
    }

    @Mappings({
            @Mapping(target = "suggestionId", ignore = true),
            @Mapping(target = "userId", ignore = true)
    })
    VoteDto toDto(VoteEntity voteEntity);

    @AfterMapping
    default void mapDto(@MappingTarget VoteDto voteDto, VoteEntity voteEntity) {
        voteDto.setSuggestionId(voteEntity.getVoteId().getSuggestionId());
        voteDto.setUserId(voteEntity.getVoteId().getUserId());
    }
}
