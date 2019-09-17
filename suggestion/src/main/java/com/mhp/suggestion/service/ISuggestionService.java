package com.mhp.suggestion.service;
//Marius
import com.mhp.suggestion.dto.*;
import com.mhp.suggestion.entity.SuggestionEntity;
import com.mhp.suggestion.helper.enums.ESugestionStatus;

import java.util.List;

public interface ISuggestionService  {

    SuggestionCreateDto createSugggestion(SuggestionCreateDto suggestionToCreate);

    List<SuggestionDto> getAllSuggestionsByStatusAndDateDesc(ESugestionStatus status);

    List<SuggestionDto> getAllSuggestionsByStatusAndScoreDesc(ESugestionStatus status);

    List<String> getAllTitles(ESugestionStatus status);

    List<SuggestionDto> getAllByTitle(String title);

    void deleteSuggestion(Long id);

    void updateSuggestion(SuggestionUpdateDto suggestionToUpdate);

    void acceptSuggestion(Long id);

    void declineSuggestion(ReasonDto reasonDto);

    SuggestionEntity getSuggestionById(Long id);

    void implementSuggestion(Long id);
    List<SuggestionDto> getSuggestionByUser(Integer offset, Long userId);
    List<SuggestionDto> getMySuggestionByUser(Long userId);
    List<SuggestionDto> getSuggetionsOffsetDate(Integer offset,ESugestionStatus status);
    List<SuggestionDto> getSuggestionsOffsetScore(Integer offset,ESugestionStatus status);

    List<String> getTitlesByUser(Long userId);
    List<SuggestionDto> getAllByTitleOnEnter(ESugestionStatus status, String title);
    List<SuggestionDto> getAllByTitleAndIdOnEnter(Long userId, String title);
    void deleteSuggestionAdmin(ReasonDto reasonDto);

    List<SuggestionDto> getSuggestionsByUserScore(Integer offset,Long userId);

    List<SuggestionDto> getAllByTags(List<TagsDto> tags, ESugestionStatus status);

}
