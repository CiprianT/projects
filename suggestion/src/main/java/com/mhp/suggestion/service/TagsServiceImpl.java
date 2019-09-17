package com.mhp.suggestion.service;
/**
 * @author marius
 */
import com.mhp.suggestion.dto.TagsDto;
import com.mhp.suggestion.entity.TagsEntity;
import com.mhp.suggestion.mappers.TagsMapper;
import com.mhp.suggestion.repository.TagsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class TagsServiceImpl implements ITagsService {

    private TagsRepository tagsRepository;
    private TagsMapper tagsMapper;
    

    @Autowired
    public TagsServiceImpl(TagsRepository tagsRepository, TagsMapper tagsMapper) {
        this.tagsRepository = tagsRepository;
        this.tagsMapper = tagsMapper;
    }

    @Override
    public List<TagsDto> getAllTags() {
        return tagsMapper.toDtoList(tagsRepository.findAll());
    }

    @Override
    public List<TagsDto> getTagsBySuggestionId(Integer id) {
        return tagsMapper.toDtoList(tagsRepository.getTagsBySuggestionId(id));
    }
}
