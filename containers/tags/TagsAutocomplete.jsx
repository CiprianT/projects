import Autosuggest from 'react-autosuggest';
import React from 'react';
import "./style/tagsStyle.css";
import "./style/theme.css";
import { connect } from 'react-redux';
import { loadTagsActionCreator } from '../suggestion/redux/actionCreators/tagsActionCreators';
/**
 * @author [Laura Luca]
 */
class TagsAutocomplete extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            suggestions: [],
            tags:[]
            
        };
    }

    getSuggestions = value => {
        const inputValue = value.trim().toLowerCase();
        const inputLength = inputValue.length;
    
        return inputLength === 0 ? [] : this.state.tags.filter(item =>
            item.name.toLowerCase().slice(0, inputLength) === inputValue
        );
    };

    onSuggestionsFetchRequested = ({ value }) => {
        this.setState({
            suggestions: this.getSuggestions(value)
        });
    };

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        });
    };

    getSuggestionValue = suggestion => suggestion.name;
    
    renderSuggestion = suggestion => (
        <div>
            {suggestion.name}
        </div>
    );
    renderInputComponent = inputProps => (
        <div>
          <input  {...inputProps} />
        </div>
      );

      componentDidMount() {
        this.props.loadTags();
    }

    componentDidUpdate(prevProps) {
        const { tags: prevTags } = prevProps;
        const { tags: nextTags } = this.props;
        if (prevTags !== nextTags) {
            this.setState({
                tags: [...nextTags]
            })
        }

    }

    render() {
        const { suggestions } = this.state;
        return (
            <Autosuggest
                suggestions={suggestions}
                onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
                onSuggestionsClearRequested={this.onSuggestionsClearRequested}
                getSuggestionValue={this.getSuggestionValue}
                renderSuggestion={this.renderSuggestion}
                inputProps={{
                    placeholder: 'Tags . . .',
                    value: this.props.value,
                    onChange: this.props.onChange,
                    name:"tag",
                    onKeyDown:this.props.handleInputKeyDown,
                    style:{width:"220px"}
                }}
                onSuggestionSelected={this.props.onSuggestionSelected}
                renderInputComponent={this.renderInputComponent}


            />
        );
    }
}

const mapStatToProps = (state) => {
    return {

        tags: state.tagReducer.tagList,

    }

}
const mapDispatchToProps = dispatch => {
    return {
        loadTags: () => dispatch(loadTagsActionCreator()),

    };
};
export default connect(mapStatToProps, mapDispatchToProps)(TagsAutocomplete);