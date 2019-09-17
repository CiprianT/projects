package com.mhp.suggestion.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

import java.util.ArrayList;

/**
 * @author marius
 */
@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class SuggestionCreateDto {
    private String title;
    private String text;
    private Long author;
    private ArrayList<TagsDto> tags;
    private Boolean anonymous;

}
