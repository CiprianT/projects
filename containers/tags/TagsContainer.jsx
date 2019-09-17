import React from 'react';
import "./style/tagsStyle.css";
import "./style/theme.css";
import TagsAutocomplete from "./TagsAutocomplete"
import { FaTimes } from 'react-icons/fa';


/**
 * @author [Laura Luca]
 * @param {onSuggestionSelected,handleInputKeyDown,onChange,value,handleRemoveItem } props 
 */
const TagContainer = (props) => {
    return (
        <React.Fragment>

            <div className="test">

                <div>
                    {props.items.map((item, i) =>
                        <div class="tag">
                            {item.name}
                            <div class="tag-exit times" onClick={(event) => props.handleRemoveItem(event, i)}>
                                <FaTimes/>
                            </div>
                        </div>
                    )}
                </div>
                <div className="tags-autocomplete-div">
                    <TagsAutocomplete
                        onSuggestionSelected={props.onSuggestionSelected}
                        handleInputKeyDown={props.handleInputKeyDown}
                        onChange={props.onChange}
                        value={props.value}
                    ></TagsAutocomplete>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TagContainer;