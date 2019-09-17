
import React from 'react';
import { FaHeart, FaRegCalendarAlt, FaRegThumbsDown, FaRegThumbsUp, FaTrashRestore } from 'react-icons/fa';
import ModalEditComponent from '../../../modal/ModalEditComponent';
import ModalReasonComponent from '../../../modal/ModalReasonComponent';
import ESugestionStatus from '../../ESugestionStatus';
import './card.css';
import CardTags from './CardTags';

class CardActive extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: this.props.suggestion.score,
            userPreference: this.props.suggestion.userPreference,
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
        return (
            <div className="card green">
                <div className="additional">
                    <div className="user-card">

                        <div className="level center">
                            {this.props.suggestion.firstAndLastName}
                        </div>
                        <div style={{ position: "absolute", top: "96px", width: "100%" }}>
                            <object className="card-image img img-rounded1 img-fluid" data={this.props.suggestion.photo} type="image/png">
                                <img className="card-image-anon" src="/images/profile_man.jpg" alt="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />
                            </object>
                        </div>
                    </div>
                </div>
                <div className="general">
                    <div className="divButtons">
                        {
                            this.props.thresholds && this.props.thresholds.deleteThreshold && this.props.thresholds.deleteThreshold.value >= this.state.score && this.props.suggestion.author === this.props.user.id ?
                                <div onClick={() => this.props.submit(this.props.suggestion.id)}>
                                    <FaTrashRestore className="divIcon" />
                                </div>
                                : this.props.user.role === "ADMIN" &&
                                <React.Fragment>
                                    <ModalReasonComponent
                                        title={this.props.suggestion.title} id={this.props.suggestion.id} status={ESugestionStatus.ACTIVE}
                                    ></ModalReasonComponent>
                                </React.Fragment>
                        }
                        {this.props.thresholds && this.props.thresholds.updateThreshold && this.state.score <= this.props.thresholds.updateThreshold.value && this.props.suggestion.author === this.props.user.id &&
                            <ModalEditComponent userId={null} suggestion={this.props.suggestion}></ModalEditComponent>
                        }
                    </div>
                    <div className="postDate">
                        <FaRegCalendarAlt style={{ marginTop: "-4px", marginRight: "2px" }} /> {this.props.suggestion.postDate}
                    </div>
                    <h1>{this.props.suggestion.title}</h1>
                    <p>{this.props.suggestion.text}</p>
                    <CardTags addTag={this.props.addTag} tags={this.props.suggestion.tags}></CardTags>
                    {this.props.user && this.props.user.id !== this.props.suggestion.author ?
                        <div className="votes">
                            <div
                                id={"like" + this.props.suggestion.id}
                                className={this.state.userPreference === 1 ? "liked" : ""}
                                onClick={() => { this.vote(1); }}
                            >
                                <FaRegThumbsUp className="enabled" />
                            </div>
                            <div className="swing">
                                <FaHeart style={{ color: "#d63031" }} />{" " + this.state.score}
                            </div>
                            <div
                                id={"dislike" + this.props.suggestion.id}
                                className={this.state.userPreference === -1 ? "disliked" : ""}
                                onClick={() => { this.vote(-1); }}
                            >
                                <FaRegThumbsDown className="enabled" />
                            </div>
                        </div>
                        : <div class="votes">

                            <div className="swing">
                                <FaHeart style={{ color: "#d63031" }} />{" " + this.state.score}
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}
export default CardActive;
