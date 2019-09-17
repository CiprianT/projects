package com.mhp.suggestion.controller;

import com.mhp.suggestion.dto.VoteDto;
import com.mhp.suggestion.dto.VoteDtoScore;
import com.mhp.suggestion.helper.VoteEndpoints;
import com.mhp.suggestion.service.VoteServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

@RestController
@CrossOrigin
@RequestMapping(value = VoteEndpoints.VOTE_ROOT)
@PreAuthorize("isAuthenticated()")
public class VoteController {
    private VoteServiceImpl voteService;

    @Autowired
    public VoteController(VoteServiceImpl voteService) {
        this.voteService = voteService;
    }

    @PostMapping(value = VoteEndpoints.VOTE_SAVE, consumes = APPLICATION_JSON_VALUE)
    public ResponseEntity saveVote(@RequestBody VoteDto voteDto) {
        voteService.saveVote(voteDto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @DeleteMapping(value = VoteEndpoints.VOTE_DELETE)
    public ResponseEntity deleteVote(@PathVariable Long userId, @PathVariable Long suggestionId){
        voteService.deleteVote(userId, suggestionId);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
