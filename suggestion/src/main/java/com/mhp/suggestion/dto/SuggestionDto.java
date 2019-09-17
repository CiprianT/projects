package com.mhp.suggestion.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.mhp.suggestion.entity.TagsEntity;
import com.mhp.suggestion.helper.enums.ESugestionStatus;
import com.mhp.suggestion.helper.enums.EUserPreference;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author cteisanu
 */

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SuggestionDto {
    private Long id;
    private String title;
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd-MM-yyyy HH:mm")
    private LocalDateTime postDate;
    private String text;
    private Long author;
    private ESugestionStatus status;
    private String firstAndLastName;
    private String photo;
    private Integer score;
    private Set<TagsDto> tags=new HashSet<>();

    private EUserPreference userPreference;
}
