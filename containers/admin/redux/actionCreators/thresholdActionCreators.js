import swal from 'sweetalert';
import axiosInstance from "../../../../axios/axios";
import { loadThresholdsActionSuccesful, updateThresholdActionSuccesful } from '../actionCreators/thresholdActionSuccesful';
/**
 * @author [Laura Luca]
 */
export const loadThresholdsActionCreator = () =>{
    return dispatch =>{
        return axiosInstance
        .get("http://localhost:8080/threshold-service/get-all")
        .then( res =>{
            const {values : thresholds} = res.data;
            dispatch(loadThresholdsActionSuccesful(thresholds))
        })
        .catch(err=>{
            swal("Oops...", "Could not load thresholds", "error");
        })
    }
}

/**
 * @author [Laura Luca]
 */
export const updateThresholdActionCreator  = (threshold)=>{
    return dispatch =>{
        return axiosInstance
        .put("http://localhost:8080/admin/update-threshold",{...threshold})
        .then(res=>{
            dispatch(updateThresholdActionSuccesful());
            dispatch(loadThresholdsActionCreator());
        })
        .catch(err=>{
            swal("Oops...", "Could not update threshold", "warning");
        })
    }
}