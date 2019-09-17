package com.mhp.suggestion.service;

import com.mhp.suggestion.dto.TagsDto;
import com.mhp.suggestion.entity.TagsEntity;
import com.mhp.suggestion.helper.TagsEndpoints;

import java.util.List;

/**
 * @author : rionescu
 */

public interface ITagsService {
    List<TagsDto> getAllTags();
    List<TagsDto> getTagsBySuggestionId(Integer id);

}
