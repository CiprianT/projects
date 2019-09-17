/**
 * @author [Andra Marian]
 */
import React from 'react';
import { FaHeart, FaRegCalendarAlt, FaTrashRestore, FaFileImport } from 'react-icons/fa';
import ModalEditComponent from '../../modal/ModalEditComponent';
import ModalReasonComponent from '../../modal/ModalReasonComponent';
import ESugestionStatus from '../ESugestionStatus';
import "../style/cardStyle.css";
import { FaCheck, FaCheckDouble, FaEllipsisH, FaRegTimesCircle, FaHistory } from 'react-icons/fa';

class SuggestionCardMine extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            score: this.props.suggestion.score,
            userPreference: this.props.suggestion.userPreference,
            author: this.props.suggestion.author
        }
    }


    renderSwitch(switchCase) {
        switch (switchCase) {
            case 0:
                return (<div><FaHistory></FaHistory>  ACTIVE</div>);
            case 1:
                return  (<div><FaEllipsisH></FaEllipsisH>  PENDING</div>)
                ;
            case 2:
                return  (<div><FaCheck></FaCheck>  ACCEPTED</div>);
            case 3:
                return  (<div><FaRegTimesCircle></FaRegTimesCircle>  DECLINED</div>);
            case 4:
                return  (<div><FaCheckDouble></FaCheckDouble>  IMPLEMENTED</div>);
            default:
                break;
        }
    }


    render() {

        return (
            <div class="card green">
                <div class="additional">
                    <div class="user-card">

                        <div class="level center">
                            {this.props.suggestion.firstAndLastName}
                        </div>
                        <div style={{ position: "absolute", top: "96px", width: "100%" }}>
                            <object className="card-image img img-rounded1 img-fluid" data={this.props.suggestion.photo} type="image/png">
                                <img className="card-image-anon" src="/images/profile_man.jpg" alt="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />
                            </object>
                        </div>
                    </div>
                </div>
                <div class="general">
                    <div className="divButtons">
                        {
                            this.props.thresholds.deleteThreshold && this.props.thresholds.deleteThreshold.value >= this.state.score && this.props.suggestion.author === this.props.user.id && this.props.suggestion.status === 0 ?
                                <div onClick={() => this.props.submit(this.props.suggestion.id)}>
                                    <FaTrashRestore className="divIcon" />
                                </div>
                                : this.props.user.role === "ADMIN" &&
                                <React.Fragment>
                                    <ModalReasonComponent
                                        title={this.props.suggestion.title} id={this.props.suggestion.id} status={ESugestionStatus.MINE}
                                    ></ModalReasonComponent>
                                </React.Fragment>
                        }
                        {this.props.thresholds.updateThreshold && this.state.score <= this.props.thresholds.updateThreshold.value && this.props.suggestion.author === this.props.user.id && this.props.suggestion.status === 0 &&
                            <ModalEditComponent userId={this.props.user.id} suggestion={this.props.suggestion}></ModalEditComponent>
                        }
                    </div>
                    <div className="postDate">
                        <FaRegCalendarAlt style={{ marginTop: "-4px", marginRight: "2px" }} /> {this.props.suggestion.postDate}
                    </div>
                    <h1>{this.props.suggestion.title}</h1>
                    <p>{this.props.suggestion.text}</p>
                    <div class="votes">
                        <div className="swing">
                            <FaHeart style={{ color: "#d63031" }} />{" " + this.state.score}
                        </div>
                        <div className="status-div">
                            {/* <FaFileImport   style={{ height:"15px", marginTop: "-4px", marginRight: "4px" }}/> */}
                            {this.renderSwitch(this.props.suggestion.status)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


export default SuggestionCardMine;
