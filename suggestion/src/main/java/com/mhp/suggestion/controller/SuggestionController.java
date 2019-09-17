package com.mhp.suggestion.controller;

import com.mhp.notification.service.INotificationService;
import com.mhp.shared.dto.ListDto;
import com.mhp.shared.dto.UserDto;
import com.mhp.shared.service.IUserService;
import com.mhp.suggestion.dto.*;
import com.mhp.suggestion.entity.SuggestionEntity;
import com.mhp.suggestion.helper.SuggestionEndpoints;

import com.mhp.suggestion.helper.enums.ESugestionStatus;
import com.mhp.suggestion.service.ISuggestionService;
import com.mhp.suggestion.service.IVoteService;
import com.mhp.suggestion.service.SuggestionServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;


import java.util.ArrayList;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@RequestMapping(SuggestionEndpoints.SUGGESTION_ROOT)
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class SuggestionController {
    private ISuggestionService suggestionServiceImpl;
    private INotificationService notificationService;
    private IVoteService voteService;
    private IUserService userService;
    @Autowired
    public SuggestionController(SuggestionServiceImpl suggestionServiceImpl, INotificationService notificationService, IVoteService voteService, IUserService userService) {
       this.suggestionServiceImpl = suggestionServiceImpl;
        this.notificationService = notificationService;
        this.voteService = voteService;
        this.userService = userService;
    }

    /**
     * get all suggesions
     */
    @GetMapping(value = SuggestionEndpoints.SUGESSTION_GET_ALL, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<SuggestionDto>> getAllSuggestions(@PathVariable ESugestionStatus status){
        return new ResponseEntity<>(new ListDto<>(suggestionServiceImpl.getAllSuggestionsByStatusAndDateDesc(status)), HttpStatus.OK);
    }

    @GetMapping(value = SuggestionEndpoints.SUGGESTION_GET_BY_USER, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<SuggestionDto>> getSuggestionsByUser(@PathVariable Integer offset,@PathVariable Long userId) {
        return new ResponseEntity<>(new ListDto<>(suggestionServiceImpl.getSuggestionByUser(offset,userId)), HttpStatus.OK);
    }
    @GetMapping(value= SuggestionEndpoints.SUGGESTION_GET_BY_USER_SCORE,produces=APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<SuggestionDto>> getSuggestionByUserScore(@PathVariable Integer offset,@PathVariable Long userId)
    {
        return new ResponseEntity<>(new ListDto<>(suggestionServiceImpl.getSuggestionsByUserScore(offset,userId)),HttpStatus.OK);
    }

    @GetMapping(value = SuggestionEndpoints.SUGGESTION_GET_TITLE_BY_USER, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String>> getTitlesByUser(@PathVariable Long userId) {
        return new ResponseEntity<>(new ArrayList<>(suggestionServiceImpl.getTitlesByUser(userId)),HttpStatus.OK);
    }

    @PostMapping(value = SuggestionEndpoints.SUGESSTION_POST_CREATE, produces = APPLICATION_JSON_VALUE,consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<SuggestionCreateDto> createSuggestion(@RequestBody SuggestionCreateDto suggestionToCreate){
        return new ResponseEntity<>(suggestionServiceImpl.createSugggestion(suggestionToCreate), HttpStatus.OK);
    }


    @GetMapping(value = SuggestionEndpoints.SUGGESTION_GET_BY_PREFERENCE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<SuggestionDto>> getAllByScore(@PathVariable ESugestionStatus status){
        return new ResponseEntity<>(new ListDto<>(suggestionServiceImpl.getAllSuggestionsByStatusAndScoreDesc(status)),HttpStatus.OK);
    }

    @GetMapping(value=SuggestionEndpoints.SUGGESTION_GET_SUGGESTIONS_OFFSET_DATE,produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<SuggestionDto>> getSuggetionsOffsetDate(@PathVariable Integer offset,@PathVariable ESugestionStatus status)
    {
        return new ResponseEntity<>(new ListDto<>(suggestionServiceImpl.getSuggetionsOffsetDate(offset,status)),HttpStatus.OK);
    }
    @GetMapping(value=SuggestionEndpoints.SUGGESTION_GET_SUGGETIONS_OFFSET_SCORE,produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<SuggestionDto>> getSuggestionsOffsetScore(@PathVariable Integer offset,@PathVariable ESugestionStatus status)
    {
        return new ResponseEntity<>(new ListDto<>(suggestionServiceImpl.getSuggestionsOffsetScore(offset,status)),HttpStatus.OK);
    }

    @GetMapping(value = SuggestionEndpoints.SUGGESTION_GET_TITLES, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<List<String>> getTitles(@PathVariable ESugestionStatus status){
        return new ResponseEntity<>(new ArrayList<>(suggestionServiceImpl.getAllTitles(status)), HttpStatus.OK);
    }

    @GetMapping(value = SuggestionEndpoints.SUGGESTION_GET_BY_TITLE, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<SuggestionDto>> getAllByTitle(@PathVariable String title){
        return new ResponseEntity<>(new ListDto<>(suggestionServiceImpl.getAllByTitle(title)),HttpStatus.OK);
    }

    @DeleteMapping(value=SuggestionEndpoints.SUGGESTION_DELETE)
    public ResponseEntity deleteSuggestion(@PathVariable("id") Long id){
        SuggestionEntity suggestionEntity = suggestionServiceImpl.getSuggestionById(id);
        suggestionServiceImpl.deleteSuggestion(id);
        List<VoteDto> votes = voteService.getAllVotesForSuggestion(id);
        votes.forEach(x -> {
            if (!suggestionEntity.getAuthor().getUserId().equals(x.getUserId())) {
                if (x.getPreference() == -1) {
                    notificationService.saveNotification(x.getUserId(),id, "The suggestion with the title \"" + suggestionEntity.getTitle() + "\" that you disliked has been deleted.");
                } else {
                    notificationService.saveNotification(x.getUserId(), id, "The suggestion with the title \"" + suggestionEntity.getTitle() + "\" that you liked has been deleted.");
                }
            }
        });
        List<Long>usersThatVoted=voteService.getUsersIdForSuggestion(id);
        List<UserDto>admins=userService.getAllAdmins();
        admins.forEach(x->{
            if(!usersThatVoted.contains(x.getUserId())){
                notificationService.saveNotification(x.getUserId(), id, "The suggestion with the title \"" + suggestionEntity.getTitle() + "\" has been deleted by its owner. ");
            }
        });
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping(value = SuggestionEndpoints.SUGGESTION_UPDATE, produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity updateMovie(@RequestBody SuggestionUpdateDto suggestionToUpdate) {
        suggestionServiceImpl.updateSuggestion(suggestionToUpdate);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping(value = SuggestionEndpoints.SUGGESTION_GET_BY_TITLE_ENTER, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<SuggestionDto>> getAllByTitleOnEnter(@PathVariable ESugestionStatus status, @PathVariable String title){
        return new ResponseEntity<>(new ListDto<>(suggestionServiceImpl.getAllByTitleOnEnter(status,title)),HttpStatus.OK);
    }

    @GetMapping(value = SuggestionEndpoints.SUGGESTION_GET_BY_TITLE_AND_ID_ENTER, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<SuggestionDto>> getAllByTitleAndIdOnEnter(@PathVariable Long userId, @PathVariable String title){
        return new ResponseEntity<>(new ListDto<>(suggestionServiceImpl.getAllByTitleAndIdOnEnter(userId,title)),HttpStatus.OK);
    }

    @PostMapping(value = SuggestionEndpoints.GET_ALL_BY_TAGS, produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<SuggestionDto>> getAllByTags(@RequestBody List<TagsDto> tags, @PathVariable ESugestionStatus status){
        return new ResponseEntity<>(new ListDto<>(suggestionServiceImpl.getAllByTags(tags, status)), HttpStatus.OK);
    }
}
