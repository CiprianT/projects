import React from 'react';
import Autosuggest from 'react-autosuggest';
import { FaSearch } from 'react-icons/fa';
import { connect } from 'react-redux';
import { loadOneUserActionCreators, loadUsersInfoActionCreators } from '../redux/actionCreators/superAdminActionCreators';
/**
 * Author [Marius]
 */
class SearchFieldUsers extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      suggestions: [],
      userInfo:[],
    };
  }

  onChange = (event, { newValue }) => {

   if(typeof(newValue)==='object')
     newValue=newValue.username;
    this.setState({
      value: newValue
    });
    if (newValue.length === 0) {
      
      this.props.getEmptyUserInfo(newValue);
    }
  };

  componentDidMount() {
    this.props.loadUsers(this.props.id);
    this.setState({
      suggestions: this.props.userInfo,
      
})
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
    const inputValue = value.trim().toLowerCase();    
    let arr = this.props.userInfo.filter(user =>
      user.username.toLowerCase().includes(inputValue));
    
    return arr;
    
  };
  onSuggestionSelected = (event, { suggestion, suggestionValue, suggestionIndex, sectionIndex, method }) => {
    this.props.loadOneUser(suggestion.username);
    
  }

  getSuggestionValue = suggestion => suggestion;

  renderSuggestion = suggestion => (
    <div style={{width:"200px"}}>
      {suggestion.username}
    </div>
  );
  


  getOnEnter = (e) => {
    if (e.target.value.length !== 0) {
    if (e.key === "Enter")
      this.props.getUserInfoEnter(e.target.value);
  }}

  render() {
    let { value, suggestions } = this.state;
    value=value===undefined? '':value;
    const inputProps = {
      placeholder: 'Search by username',
      value,
      onChange: this.onChange,
      onKeyDown: this.getOnEnter,
      style:{width:"200px"}
    };
    return (
      <div style={{ border: "1px solid #D0D0D0", width: "300px", marginTop: "10px", float: "right", borderRadius: "5px" }}>
        <div  style={{ float: "left"}} className="autocomplete-users">
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
        <div className="blue" style={{ color: "white", width: "35px", height: "30px", float: "right", textAlign: "center", borderTopLeftRadius: "0", borderBottomLeftRadius: "0" }}
          onClick={() => {this.props.getTitleEnter(this.state.value)}}>
          <FaSearch></FaSearch>
        </div>

      </div>

    )
  }

}

const mapDispatchToProps=(dispatch) =>{
    return{
        loadUser:(id) =>dispatch(loadUsersInfoActionCreators(id)),
        loadOneUser:(username)=>dispatch(loadOneUserActionCreators(username))
    };
};

const mapStatToProps=(state)=>{
    return {
        userInfo:state.adminReducer.usersInfo,
    }
}
export default connect(mapStatToProps, mapDispatchToProps)(SearchFieldUsers);