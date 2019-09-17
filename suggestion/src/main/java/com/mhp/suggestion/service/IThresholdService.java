package com.mhp.suggestion.service;

import com.mhp.suggestion.dto.ThresholdDto;
import com.mhp.suggestion.dto.ThresholdUpdateDto;

import java.util.List;

/**
 * @author Laura Luca
 */
public interface IThresholdService {
    List<ThresholdDto> getAllThresholds();

    void updateThreshold(ThresholdUpdateDto thresholdUpdateDto);
}
