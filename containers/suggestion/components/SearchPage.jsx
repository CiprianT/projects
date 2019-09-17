import React from 'react';
import Autosuggest from 'react-autosuggest';
import { FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';
import { getTitlesMySuggestionsSearch, getTitlesSuggestionSearch } from '../redux/actionCreators/suggestionActionCreators';
import ESugestionStatus from './ESugestionStatus';
import "./style/cardStyle.css";

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
    };
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
    if (newValue.length === 0) {
      this.props.getEmptyTitle(newValue);
    }
  };

  componentDidMount() {
    if (this.props.type === ESugestionStatus.MINE) {
      this.props.loadMyTitles(this.props.user.id)
    } else
      this.props.loadTitles(this.props.type);
  }

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

  getSuggestions = value => {
    const inputValue = value.trim();
    var letters = /^[A-Za-z]+$/;
    if (inputValue.match(letters)) {
      const inputLength = inputValue.length;
      return inputLength === 0 ? [] : this.props.titles.filter(title =>
        title.match(inputValue)
      );
    } else {
      return [];
    }
  };

  getSuggestionValue = suggestion => suggestion;

  renderSuggestion = suggestion => (
    <div>
      {suggestion}
    </div>
  );

  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.props.getTitle(suggestion)
  }

  getOnEnter = (e) => {
    if (e.target.value.length !== 0) {
      if (e.key === "Enter")
        this.props.getTitleEnter(e.target.value);
    }
  }

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      placeholder: 'Search',
      value,
      onChange: this.onChange,
      onKeyDown: this.getOnEnter
    };
    return (
      <div style={{ border: "1px solid #D0D0D0", width: "500px", marginTop: "10px", float: "right", borderRadius: "5px" }}>
        <div style={{ float: "left", width: "462px" }} className="search-bar">
          <Autosuggest
            suggestions={suggestions}
            onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
            onSuggestionsClearRequested={this.onSuggestionsClearRequested}
            getSuggestionValue={this.getSuggestionValue}
            renderSuggestion={this.renderSuggestion}
            inputProps={inputProps}
            onSuggestionSelected={this.onSuggestionSelected}
          />
        </div>
        <div className="blue" style={{ color: "white", width: "35px", height: "30px", float: "right", textAlign: "center", borderTopLeftRadius: "0", borderBottomLeftRadius: "0", marginTop: "-1px" }}
          onClick={() => { this.props.getTitleEnter(this.state.value) }}>
          <FaSearch></FaSearch>
        </div>

      </div>

    )
  }

}

const mapDispatchToProps = (dispatch) => {
  return {
    loadMyTitles: (userId) => dispatch(getTitlesMySuggestionsSearch(userId)),
    loadTitles: (type) => dispatch(getTitlesSuggestionSearch(type)),
  };
};

const mapStatToProps = (state) => {
  return {
    titles: state.suggestionReducer.suggestionTitles,
    user: state.userReducer.user,
  }
};

export default connect(mapStatToProps, mapDispatchToProps)(SearchPage);