/**
 * @author [Andra Marian]
 */
import React from 'react';
import { FaHeart, FaRegThumbsDown, FaRegThumbsUp, FaTrashRestore } from 'react-icons/fa';
import ModalEditComponent from '../modal/ModalEditComponent';
import ModalReasonComponent from '../modal/ModalReasonComponent';
import ESugestionStatus from './ESugestionStatus';
import "./style/cardStyle.css";

class SuggestionCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: this.props.suggestion.score,
            userPreference: this.props.suggestion.userPreference,
            author: this.props.suggestion.author
        }


    }
    vote(pref) {
        if (this.state.userPreference === pref) {
            this.setState({
                score: this.state.score - pref,
                userPreference: 0,

            })
            this.props.deleteVote(this.props.suggestion.id);

        }
        else {
            if (this.state.userPreference === 0) {
                this.setState({
                    score: this.state.score + pref,
                    userPreference: pref,

                })
            }
            else {
                this.setState({
                    score: this.state.score - this.state.userPreference + pref,
                    userPreference: pref,

                })
            }
            this.props.saveVote(this.props.suggestion.id, pref);
        }

    }

    render() {
        var elements = [];

        if (this.props.suggestion.author === this.props.user.id) {
            if (this.props.thresholds.updateThreshold.value >= this.state.score) {

                elements.push(<ModalEditComponent suggestion={this.props.suggestion}></ModalEditComponent>)

            }

            if (this.props.thresholds.deleteThreshold.value >= this.state.score) {
                elements.push(<div className="button-delete1" onClick={() => this.props.submit(this.props.suggestion.id)}>
                    <FaTrashRestore style={{ height: "15px", width: "15px", marginTop: "3px", marginLeft: "1px" }} />
                </div>)

            }
        }
        else { elements.push(<div style={{ width: "620px", height: "30px" }}> </div>) }


        return (
            <div className="td-card">
                <div className="card cardy">
                    <div className="card-body" style={{ backgroundColor: "#F5F5F5" }}>
                        <div className="row">
                            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
                            { this.props.user && this.props.user.role === "ADMIN"?
                             <React.Fragment>
                                  <ModalReasonComponent
                                     title={this.props.suggestion.title} id={this.props.suggestion.id} status = {ESugestionStatus.ACTIVE} declined={false}
                                 ></ModalReasonComponent>
                             </React.Fragment>
                             : null  
                            }     
                            {
                                elements
                            }
                        </div>
                        <div className="row">
                            <div className="column column1-card">
                                <object className="card-image img img-rounded1 img-fluid" data={this.props.suggestion.photo} type="image/png">
                                    <img className="card-image-anon" src="/images/profile_man.jpg" alt="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />
                                </object>
                                <p className="name-text" >{this.props.suggestion.firstAndLastName}</p>
                                <p className="text-secondary text-center">{this.props.suggestion.postDate}</p>
                            </div>
                            <div className="column column2-card1">
                                <p className="title-design">
                                    <a><strong>{this.props.suggestion.title}</strong></a>
                                </p>
                                <p className="suggestion-text">{this.props.suggestion.text}</p>
                                

                                <p>
                                    {this.props.user && this.props.user.id !== this.props.suggestion.author &&
                                        <div className="like-dislike-buttons1">
                                            <button id={"like" + this.props.suggestion.id} className={"push_button grey" + (this.state.userPreference === 1 ? " pushed1" : " ")} onClick={() => { this.vote(1); }} disabled={this.props.suggestion.author === this.props.user.id}  ><FaRegThumbsUp style={{ marginTop: "-10px" }} /> </button>
                                            <button id={"dislike" + this.props.suggestion.id} className={"push_button grey" + (this.state.userPreference === -1 ? " pushed" : " ")} onClick={() => { this.vote(-1); }} disabled={this.props.suggestion.author === this.props.user.id}><FaRegThumbsDown style={{ marginTop: "-8px" }} /></button>
                                        </div>
                                        }
                                    <div >
                                        <a className="score-label1"> <i></i> <span className="score-p1">
                                            <FaHeart style={{ color: "red", width: "20px", height: "20px" }} />
                                            {" " + this.state.score}
                                        </span></a>
                                    </div>
                                </p>
                                <p>

                                </p>

                            </div>
                        </div>

                    </div>
                </div>
            </div>

        )
    }
}
export default SuggestionCard;
