package com.mhp.suggestion.controller;

import com.mhp.shared.dto.ListDto;
import com.mhp.suggestion.dto.ThresholdDto;
import com.mhp.suggestion.helper.ThresholdEndpoints;
import com.mhp.suggestion.service.IThresholdService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.APPLICATION_JSON_VALUE;

/**
 * @author Laura Luca
 */
@RestController
@RequestMapping(ThresholdEndpoints.THRESHOLD_ROOT)
@CrossOrigin
@PreAuthorize("isAuthenticated()")
public class ThresholdController {
    private IThresholdService thresholdService;

    @Autowired
    public ThresholdController(IThresholdService thresholdService) {
        this.thresholdService = thresholdService;
    }

    @GetMapping(value = ThresholdEndpoints.THRESHOLD_GET_ALL, produces = APPLICATION_JSON_VALUE)
    public ResponseEntity<ListDto<ThresholdDto>> getAllThresholds() {
        return new ResponseEntity<>(new ListDto<>(thresholdService.getAllThresholds()), HttpStatus.OK);
    }
}
