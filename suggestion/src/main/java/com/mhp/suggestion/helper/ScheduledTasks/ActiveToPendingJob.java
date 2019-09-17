package com.mhp.suggestion.helper.ScheduledTasks;

import com.mhp.notification.service.INotificationService;
import com.mhp.shared.dto.UserDto;
import com.mhp.shared.service.IUserService;
import com.mhp.suggestion.dto.ThresholdDto;
import com.mhp.suggestion.dto.VoteDto;
import com.mhp.suggestion.entity.SuggestionEntity;
import com.mhp.suggestion.entity.VoteEntity;
import com.mhp.suggestion.helper.enums.ESugestionStatus;
import com.mhp.suggestion.mappers.SuggestionMapper;
import com.mhp.suggestion.repository.SuggestionRepository;
import com.mhp.suggestion.service.ISuggestionService;
import com.mhp.suggestion.service.IThresholdService;
import com.mhp.suggestion.service.IVoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;
import javax.transaction.Transactional;
import java.util.List;
import java.util.Set;

// Author: Matei

@Component
public class ActiveToPendingJob {
    private ISuggestionService suggestion;
    private IUserService userService;
    private IThresholdService threshold;
    private SuggestionRepository repository;
    private SuggestionMapper mapper;
    private INotificationService notificationService;
    private IVoteService voteService;

    @Autowired
    public ActiveToPendingJob(ISuggestionService suggestion, IUserService userService, IThresholdService threshold, SuggestionRepository repository, SuggestionMapper mapper, INotificationService service, IVoteService voteService) {
        this.suggestion = suggestion;
        this.userService = userService;
        this.threshold = threshold;
        this.repository = repository;
        this.mapper = mapper;
        this.notificationService = service;
        this.voteService = voteService;
    }

    @Scheduled(cron = "0/5 * * * * *")
    @Transactional
    public void moveToPending() {
        List<SuggestionEntity> activeSuggestions = repository.findAllByStatus(ESugestionStatus.ACTIVE);
        ThresholdDto pendingThreshold = threshold.getAllThresholds().stream().filter((threshold) -> threshold.getName().equals("Pending")).findFirst().orElse(null);
        activeSuggestions.forEach((suggestion) -> {

            Set<VoteEntity> votes = suggestion.getVotes();
            if(votes.stream().reduce(0, (score, vote) -> score + vote.getPreference(), Integer::sum) >= pendingThreshold.getValue()) {
                List<VoteDto> votesForSuggestion = voteService.getAllVotesForSuggestion(suggestion.getId());
                suggestion.setStatus(ESugestionStatus.PENDING);
                votesForSuggestion.forEach(x -> {
                    if (suggestion.getAuthor().getUserId().equals(x.getUserId())) {
                        notificationService.saveNotification(x.getUserId(), suggestion.getId(), "Your suggestion with title \"" + suggestion.getTitle() + "\" has been moved to PENDING.");

                    } else {
                        if (x.getPreference() == -1) {
                            notificationService.saveNotification(x.getUserId(),suggestion.getId(), "The suggestion with title \"" + suggestion.getTitle() + "\" that you disliked has been moved to PENDING. ");
                        } else {
                            notificationService.saveNotification(x.getUserId(), suggestion.getId(), "The suggestion with title \"" + suggestion.getTitle() + "\" that you liked has been moved to PENDING. ");
                        }
                    }
                });
                List<Long>usersThatVoted=voteService.getUsersIdForSuggestion(suggestion.getId());
                List<UserDto>admins=userService.getAllAdmins();
                admins.forEach(x->{
                    if(!usersThatVoted.contains(x.getUserId())){
                        notificationService.saveNotification(x.getUserId(), suggestion.getId(), "The suggestion with the title \"" + suggestion.getTitle() + "\" has been moved to PENDING. ");
                    }
                });



            }
        });

        repository.saveAll(activeSuggestions);
    }
}
