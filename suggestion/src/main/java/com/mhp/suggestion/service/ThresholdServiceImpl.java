package com.mhp.suggestion.service;

import com.mhp.suggestion.dto.ThresholdDto;
import com.mhp.suggestion.dto.ThresholdUpdateDto;
import com.mhp.suggestion.entity.ThresholdEntity;
import com.mhp.suggestion.mappers.ThresholdMapper;
import com.mhp.suggestion.repository.ThresholdRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author Laura Luca
 */
@Service
public class ThresholdServiceImpl implements IThresholdService {
    private ThresholdRepository thresholdRepository;
    private ThresholdMapper thresholdMapper;

    @Autowired
    public ThresholdServiceImpl(ThresholdRepository thresholdRepository, ThresholdMapper thresholdMapper) {
        this.thresholdRepository = thresholdRepository;
        this.thresholdMapper = thresholdMapper;
    }

    @Override
    public List<ThresholdDto> getAllThresholds() {
        return thresholdMapper.toDtoList(thresholdRepository.findAll());
    }

    @Override
    public void updateThreshold(ThresholdUpdateDto thresholdUpdateDto) {
        ThresholdEntity toUpdate  = thresholdRepository.getOne(thresholdUpdateDto.getId());
        toUpdate.setValue(thresholdUpdateDto.getValue());
        thresholdRepository.save(toUpdate);
    }
}
