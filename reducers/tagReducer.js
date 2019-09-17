import { LOAD_TAGS, GET_SUGGESTIONS_BY_TAG } from "../containers/suggestion/redux/actionTypes/tagsActionTypes";

/** 
 * @param {object} state 
 * @param {object} action
 * @author [Laura Luca] 
 */

const initialTagList = {
    tagsList: [{
        tagId: 1,
        name: "food"
    },
    {
        tagId: 2,
        name: "sweets"
    }
    ]
}

const tagReducer = (state = initialTagList, action) => {
    const newState = { ...state };
    switch (action.type) {
        case LOAD_TAGS:
            newState.tagList = action.tags;
            break;
        
        default:
            break;
    }

    return newState;
}

export default tagReducer