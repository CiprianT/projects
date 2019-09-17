import React from 'react';
import './card.css';
const CardTags = (props) => {
    return (
        <div  className="tags-list">
            {props.tags.map(tag =>
                <div key={tag.id} className="tag-pill " onClick={ ()=>{props.addTag(tag)}}>
                     {tag.name}
                </div>
            )}
        </div>

    )
}
export default CardTags;