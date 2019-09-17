import React from 'react';
import { OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FaCheck, FaHeart, FaRegCalendarAlt } from 'react-icons/fa';
import ModalReasonComponent from '../../../modal/ModalReasonComponent';
import ESugestionStatus from '../../ESugestionStatus';
import "./card.css";
import CardTags from './CardTags';

const CardPending = (props) => {

    return (
        <div class="card green">
            <div class="additional">
                <div class="user-card">
                    <div class="level center">
                        {props.suggestion.firstAndLastName}
                    </div>
                    <div style={{ position: "absolute", top: "96px", width:"100%" }}>
                        <object className="card-image img img-rounded1 img-fluid" data={props.suggestion.photo} type="image/png">
                            <img className="card-image-anon" src="/images/profile_man.jpg" alt="aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa" />
                        </object>
                    </div>
                </div>
            </div>
            <div class="general">
                <div className="divButtons">
                    {props.user && props.user.role === "ADMIN" &&
                        <React.Fragment>
                            <ModalReasonComponent
                             title={props.suggestion.title} id={props.suggestion.id} status={ESugestionStatus.PENDING} type={false}
                            ></ModalReasonComponent>
                        </React.Fragment>
                    }
                </div>
                <div style={{marginTop:"10px;"}} className="postDate" >
                    <FaRegCalendarAlt style={{ marginTop: "3px", marginRight: "5px" }} /> {props.suggestion.postDate}
                </div>
                <h1>{props.suggestion.title}</h1>
                <p>{props.suggestion.text}</p>
                <CardTags addTag={props.addTag} tags={props.suggestion.tags}></CardTags>
                {props.user && props.user.role === "ADMIN" ?

                    <div class="votes">
                        <OverlayTrigger
                            key="accept-pending"
                            placement="top"
                            overlay={
                                <Tooltip id={`tooltip-accept`}>
                                    Accept
                                    </Tooltip>
                            }
                        >
                            <div
                                onClick={() => props.accept(props.suggestion.id)}
                            >
                                <FaCheck className="enabled" />
                            </div>
                        </OverlayTrigger>
                        <div  className="swing">
                            <FaHeart style={{ color: "#d63031" }} />{" " + props.suggestion.score}
                        </div>

                        <ModalReasonComponent classNameProp={"push_button grey"} title={props.suggestion.title} id={props.suggestion.id} status={ESugestionStatus.PENDING} type={true} ></ModalReasonComponent>
                        
                    </div>
                    :
                    <div className="votes">
                        <div className="swing">
                            <FaHeart style={{ color: "#d63031" }} />{" " + props.suggestion.score}
                        </div>
                    </div>
                }
            </div>
        </div>



    )
}

export default CardPending;