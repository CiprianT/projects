    import React from 'react';
import { getSuggestionsByTagActionCreator } from '../redux/actionCreators/suggestionActionCreators';
import ESugestionStatus from './ESugestionStatus';
import { FaTimes } from 'react-icons/fa';
import '../../tags/style/tagsStyle.css'


class TagsInPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ESugestionStatus.PENDING,
            filteringTags: props.filteringTags
        }
    }


    getSuggestionsByTags = () => {
        this.props.getSuggestionsByTagActionCreator(this.status, this.tags);
    }
    componentDidUpdate(prevProps) {
        const { filteringTags: prevTags } = prevProps;
        const { filteringTags: nextTags } = this.props;
        if (prevTags !== nextTags) {
            this.setState({
                filteringTags: [...nextTags]
            })
        }

    }


    render() {
        return (
            <div style={{
                position: "absolute ",
                right: "0",
                width: "150px",
                height: "50%",
                top:"62px"
            }}>
                {
                    this.state.filteringTags.length!==0 &&
                    <h4
                    style={{marginTop:"9px"}}
                    >Filtering by:</h4>
                }

                {
                    this.state.filteringTags.map(
                        tag => {
                            return (
                                <div className="tag" style={{
                                    margin:"3px"
                                }}>
                                    {tag.name}
                                    <div className="tag-exit times" onClick={() => this.props.removeTagToFiltering(tag)}>
                                        <FaTimes />
                                    </div>
                                </div>
                            )
                        }
                    )}
            </div>
        )
    }
}

const mapStatToProps = (state) => {

    return {
        suggestions: state.suggestionReducer.suggestionList,
    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        getSuggestionsByTags: (status, tags) => dispatch(getSuggestionsByTagActionCreator(status, tags)),
    };
};

export default TagsInPage;

