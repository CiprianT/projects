package com.mhp.suggestion.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author Laura Luca
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ThresholdUpdateDto {
    private Long id;
    private Long value;
}
