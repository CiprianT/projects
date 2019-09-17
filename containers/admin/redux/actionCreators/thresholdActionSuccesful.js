import { LOAD_THRESHOLDS_SUCCESFUL, UPDATE_THRESHOLD_SUCCESFUL } from '../actionTypes/tresholdActionTypes';

/**
 * @author [Laura Luca]
 */
export const loadThresholdsActionSuccesful = (thresholds)=>{
    return {
        type: LOAD_THRESHOLDS_SUCCESFUL,
        thresholds: thresholds,
    }
}

/**
 * @author [Laura Luca]
 */
export const updateThresholdActionSuccesful  = ()=>{
    return{
        type:UPDATE_THRESHOLD_SUCCESFUL
    }
}