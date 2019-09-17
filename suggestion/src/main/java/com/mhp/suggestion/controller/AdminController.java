package com.mhp.suggestion.controller;

import com.mhp.notification.service.INotificationService;
import com.mhp.shared.dto.UserDto;
import com.mhp.shared.model.UserEntity;
import com.mhp.shared.service.IUserService;
import com.mhp.suggestion.dto.ReasonDto;
import com.mhp.suggestion.dto.ThresholdUpdateDto;
import com.mhp.suggestion.dto.VoteDto;
import com.mhp.suggestion.entity.SuggestionEntity;
import com.mhp.suggestion.helper.AdminEndpoints;
import com.mhp.suggestion.service.ISuggestionService;
import com.mhp.suggestion.service.IThresholdService;
import com.mhp.suggestion.service.IVoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * @author Laura Luca
 */
@RestController
@RequestMapping(AdminEndpoints.ADMIN_ROOT)
@CrossOrigin
@PreAuthorize("isAuthenticated() && hasAuthority('ADMIN')")
public class AdminController {
    private INotificationService notificationService;
    private ISuggestionService suggestionServiceImpl;
    private IThresholdService thresholdService;
    private IVoteService voteService;
    private IUserService userService;

    @Autowired
    public AdminController(INotificationService notificationService, ISuggestionService suggestionServiceImpl, IThresholdService thresholdService, IVoteService voteService, IUserService userService) {
        this.notificationService = notificationService;
        this.suggestionServiceImpl = suggestionServiceImpl;
        this.thresholdService = thresholdService;
        this.voteService = voteService;
        this.userService = userService;
    }

    @PostMapping(value = AdminEndpoints.SUGGESTION_ACCEPTED)
    public ResponseEntity acceptSuggestion(@PathVariable Long id) {
        SuggestionEntity suggestionEntity = suggestionServiceImpl.getSuggestionById(id);
        suggestionServiceImpl.acceptSuggestion(id);

        List<VoteDto> votes = voteService.getAllVotesForSuggestion(id);
        votes.forEach(x -> {
            if (suggestionEntity.getAuthor().getUserId().equals(x.getUserId())) {
                notificationService.saveNotification(x.getUserId(), id, "Your suggestion with the title \"" + suggestionEntity.getTitle() + "\" has been accepted. ");

            } else {
                if (x.getPreference() == -1) {
                    notificationService.saveNotification(x.getUserId(), id, "The suggestion with the title \"" + suggestionEntity.getTitle() + "\" that you disliked has been accepted.");
                } else {
                    notificationService.saveNotification(x.getUserId(), id, "The suggestion with the title \"" + suggestionEntity.getTitle() + "\" that you liked has been accepted.");
                }
            }
        });

        List<Long> usersThatVoted = voteService.getUsersIdForSuggestion(id);
        List<UserDto> admins = userService.getAllAdmins();
        admins.forEach(x -> {
            if (!usersThatVoted.contains(x.getUserId())) {
                notificationService.saveNotification(x.getUserId(), id, "The suggestion with the title \"" + suggestionEntity.getTitle() + "\" has been accepted. ");
            }
        });
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(value = AdminEndpoints.SUGGESTION_DECLINED)
    public ResponseEntity declineSuggestion(@RequestBody ReasonDto reasonDto) {
        SuggestionEntity suggestionEntity = suggestionServiceImpl.getSuggestionById(reasonDto.getSuggestionId());
        suggestionServiceImpl.declineSuggestion(reasonDto);
        List<VoteDto> votes = voteService.getAllVotesForSuggestion(reasonDto.getSuggestionId());
        votes.forEach(x -> {
            if (suggestionEntity.getAuthor().getUserId().equals(x.getUserId())) {
                notificationService.saveNotification(x.getUserId(), reasonDto.getSuggestionId(), "Your suggestion with the title \"" + suggestionEntity.getTitle() + "\" has been declined with the reason \"" + reasonDto.getReason() + "\"");

            } else {
                if (x.getPreference() == -1) {
                    notificationService.saveNotification(x.getUserId(), reasonDto.getSuggestionId(), "The suggestion with the title \"" + suggestionEntity.getTitle() + "\" that you disliked has been declined with the reason \"" + reasonDto.getReason() + "\"");
                } else {
                    notificationService.saveNotification(x.getUserId(), reasonDto.getSuggestionId(), "The suggestion with the title \"" + suggestionEntity.getTitle() + "\" that you liked has been declined with the reason \"" + reasonDto.getReason() + "\"");
                }
            }
        });
        List<Long> usersThatVoted = voteService.getUsersIdForSuggestion(reasonDto.getSuggestionId());
        List<UserDto> admins = userService.getAllAdmins();
        admins.forEach(x -> {
            if (!usersThatVoted.contains(x.getUserId())) {
                notificationService.saveNotification(x.getUserId(), reasonDto.getSuggestionId(), "The suggestion with the title \"" + suggestionEntity.getTitle() + "\" that you liked has been declined with the reason \"" + reasonDto.getReason() + "\"");
            }
        });
        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(value = AdminEndpoints.SUGGESTION_IMPLEMENTED)
    public ResponseEntity implementSuggestion(@PathVariable Long id) {
        SuggestionEntity suggestionEntity = suggestionServiceImpl.getSuggestionById(id);
        suggestionServiceImpl.implementSuggestion(id);

        List<VoteDto> votes = voteService.getAllVotesForSuggestion(id);
        votes.forEach(x -> {
            if (suggestionEntity.getAuthor().getUserId().equals(x.getUserId())) {
                notificationService.saveNotification(x.getUserId(), id, "Your suggestion with the title \"" + suggestionEntity.getTitle() + "\" has been implemented. ");

            } else {
                if (x.getPreference() == -1) {
                    notificationService.saveNotification(x.getUserId(), id, "The suggestion with the title \"" + suggestionEntity.getTitle() + "\" that you disliked has been implemented.");
                } else {
                    notificationService.saveNotification(x.getUserId(), id, "The suggestion with the title \"" + suggestionEntity.getTitle() + "\" that you liked has been implemented.");
                }
            }
        });
        List<Long> usersThatVoted = voteService.getUsersIdForSuggestion(id);

        List<UserEntity> allUsers = userService.getUsersExceptOneById(0);

        allUsers.forEach(x -> {
            if (!usersThatVoted.contains(x.getUserId())) {
                notificationService.saveNotification(x.getUserId(), id, "The suggestion with the title \"" + suggestionEntity.getTitle() + "\" has been implemented. ");
            }
        });

        return new ResponseEntity(HttpStatus.OK);
    }

    @PostMapping(value = AdminEndpoints.SUGGESTION_DELETED_REASON)
    public ResponseEntity deleteSuggestionAdmin(@RequestBody ReasonDto reasonDto) {
        SuggestionEntity suggestionEntity = suggestionServiceImpl.getSuggestionById(reasonDto.getSuggestionId());
        List<VoteDto> votes = voteService.getAllVotesForSuggestion(reasonDto.getSuggestionId());
        suggestionServiceImpl.deleteSuggestionAdmin(reasonDto);
        votes.forEach(x -> {
            if (suggestionEntity.getAuthor().getUserId().equals(x.getUserId())) {
                notificationService.saveNotification(x.getUserId(), reasonDto.getSuggestionId(), "Your suggestion with the title \"" + suggestionEntity.getTitle() + "\" has been deleted with the reason \"" + reasonDto.getReason() + "\"");

            } else {
                if (x.getPreference() == -1) {
                    notificationService.saveNotification(x.getUserId(), reasonDto.getSuggestionId(), "The suggestion with the title \"" + suggestionEntity.getTitle() + "\" that you disliked has been deleted with the reason \"" + reasonDto.getReason() + "\"");
                } else {
                    notificationService.saveNotification(x.getUserId(), reasonDto.getSuggestionId(), "The suggestion with the title \"" + suggestionEntity.getTitle() + "\" that you liked has been deleted with the reason \"" + reasonDto.getReason() + "\"");
                }
            }
        });
        List<Long> usersThatVoted = voteService.getUsersIdForSuggestion(reasonDto.getSuggestionId());
        List<UserDto> admins = userService.getAllAdmins();
        admins.forEach(x -> {
            if (!usersThatVoted.contains(x.getUserId())) {
                notificationService.saveNotification(x.getUserId(), reasonDto.getSuggestionId(), "The suggestion with the title \"" + suggestionEntity.getTitle() + "\" that you liked has been deleted with the reason \"" + reasonDto.getReason() + "\"");
            }
        });
        return new ResponseEntity(HttpStatus.OK);
    }

    @PutMapping(value = AdminEndpoints.THRESHOLD_UPDATE, produces = APPLICATION_JSON_VALUE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity updateThreshold(@RequestBody ThresholdUpdateDto dto) {
        thresholdService.updateThreshold(dto);
        return new ResponseEntity(HttpStatus.OK);
    }


}
