package com.mhp.suggestion.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Set;

/**
 * @author : rionescu
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SuggestionUpdateDto {

    private Long id;
    private String title;
    private String text;
    private Boolean anonymous;
    private ArrayList<TagsDto> tags;
}
