/**
 * @author [Radu]
 */

import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaTimes, FaTrashRestore } from 'react-icons/fa';
import { connect } from 'react-redux';
import "../components/style/cardStyle.css";
import { createReasonActionCreator, declineSuggestionPending } from '../redux/actionCreators/suggestionActionCreators';
import { ReasonModal } from './ReasonModal';



class ModalReasonComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            focused: false,
            title: props.title,
            suggestionId:props.id,
            reason: '',
            type:props.type,
            validReason: false,
            status:props.status,
            classNameProp: props.classNameProp
            
        }

    }

    createReason = () => {

        const title = this.state.title;
        const reason = this.state.reason;
        const suggestionId = this.state.suggestionId;
        const type = this.state.type;
        
        const suggestion = {
            title,
            reason,
            suggestionId,
            type,

        }
        
        if ( this.state.validReason) {
            this.props.createReason(suggestion,this.state.status);
            this.setModalStow(false);
        }
        
    }

    declineSuggestion = () => {
        const title = this.state.title;
        const reason = this.state.reason;
        const suggestionId = this.state.suggestionId;
        const type = this.state.type;
        
        const suggestion = {
            title,
            reason,
            suggestionId,
            type,

        }
        
        if ( this.state.validReason) {
            this.props.declineSuggestion(suggestion,this.state.status);
            this.setModalStow(false);
        }


    }


    
    onChangeReason = (event) => {
        const { value, name } = event.target;
        if (value.length >= 5) {
            this.setState({
                validReason: true
            })
        }
        else {
            this.setState({
                validReason: false
            })
        }
        this.setState({
            [name]: value
        });
    }

    setModalStow = (b) => {
        this.setState(state => ({
            modalShow: b,
            reason:'',
            validReason: false,
            
        }))
    }

   
    render() {
        return (
            <React.Fragment>

                    {this.state.type ?
                    <OverlayTrigger
                    key="accept-pending"
                    placement="top"
                    overlay={
                        <Tooltip id={`tooltip-accept`}>
                            Decline
                            </Tooltip>
                    }
                    >
                    <div
                        onClick={() => this.setModalStow(true)}
                    >
                        <FaTimes className="enabled" />
                    </div>
                    </OverlayTrigger>
                    :
                    <div onClick={() => this.setModalStow(true)} className={this.state.classNameProp} style={{width:"30px",height:"30px"}}>
                        <FaTrashRestore className="divIcon" />
                    </div>
                    }
                    <div style={{ float: "right", marginTop: "5px", marginRight: "8px" }}>

                    
                        <ReasonModal
                            show={this.state.modalShow}
                            validated={this.state.validated}
                            onHide={this.setModalStow}
                            onChangeReason={this.onChangeReason}
                            validReason={this.state.validReason}
                            title={this.state.title}
                            reason={this.state.reason}
                            suggestionId={this.state.suggestionId}
                            type ={this.state.type}
                            onButton = {this.state.type ? this.declineSuggestion : this.createReason}
                        />
                    </div>

            </React.Fragment>
        )
    }

}
const mapStatToProps = (state) => {
    return {
        user: state.userReducer.user,
    }

}
const mapDispatchToProps = dispatch => {
    return {
        createReason: (reason,status) => dispatch(createReasonActionCreator(reason,status)),
        declineSuggestion: (reason,status) => dispatch(declineSuggestionPending(reason,status)),
    };
};
export default connect(mapStatToProps, mapDispatchToProps)(ModalReasonComponent);