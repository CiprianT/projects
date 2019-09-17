package com.mhp.suggestion.mappers;

import com.mhp.suggestion.dto.TagsDto;
import com.mhp.suggestion.entity.TagsEntity;
import org.mapstruct.Mapper;

import java.util.List;
import java.util.Set;

//marius
@Mapper(componentModel = "spring")
public interface TagsMapper {
    List<TagsDto> toDtoList(List<TagsEntity> tagsEntity);
    List<TagsEntity> toEntityList(List<TagsDto> tagsDto);
    Set<TagsEntity> toEntitySet(List<TagsDto> tagsDto);
    TagsEntity toEntity(TagsDto tagsDto);
    TagsDto toDto(TagsEntity tagsEntity);
}
