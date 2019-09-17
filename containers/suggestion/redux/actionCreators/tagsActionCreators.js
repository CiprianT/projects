import swal from 'sweetalert';
import axiosInstance from "../../../../axios/axios";
import { LOAD_TAGS , GET_SUGGESTIONS_BY_TAG} from "../actionTypes/tagsActionTypes";
/**
 * @author [Laura Luca]
 */
export const loadTagsActionCreator = () => {
    return dispatch => {
        return axiosInstance
        .get("http://localhost:8080/tags-service/get-all")
        .then((response) => {
            const { values: tags } = response.data;
            
            dispatch(loadTagsActionSuccesful(tags))

        }).catch((err)=>{
            swal("Oops...", "Could not load tags!", "error");
            
        })
    }
}

/**
 * @author [Andra Marian]
 */
export const loadTagsActionSuccesful=(tags)=>{
    return {
        type:LOAD_TAGS,
        tags:tags
    }
}


