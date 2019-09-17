package com.mhp.suggestion.controller;

import com.mhp.shared.dto.ListDto;
import com.mhp.suggestion.dto.TagsDto;
import com.mhp.suggestion.helper.TagsEndpoints;
import com.mhp.suggestion.service.ITagsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * @author : rionescu
 */

@RestController
@RequestMapping(TagsEndpoints.TAGS_ROOT)
public class TagsController {
    private ITagsService tagsService;
    @Autowired
    public TagsController(ITagsService tagsService) {
        this.tagsService = tagsService;
    }
    @GetMapping(value= TagsEndpoints.TAGS_GET_ALL,produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<TagsDto>> getAllTags()
    {
        return new ResponseEntity<>(new ListDto<>(tagsService.getAllTags()), HttpStatus.OK);
    }

    /**
     * @author : marius
     */
    @GetMapping(value=TagsEndpoints.TAGS_GET_BY_SUGGESTION,produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<TagsDto>> getTagsBySuggestionId(@PathVariable Integer id)
    {
        return new ResponseEntity<>(new ListDto<>(tagsService.getTagsBySuggestionId(id)),HttpStatus.OK);
    }


}
