package com.mhp.suggestion.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;

@Data
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class ThresholdDto {
    private Long id;
    private String name;
    private String description;
    private Long value;
}
