import React from 'react';
import { Modal } from 'react-bootstrap';
import { FaCheck, FaCheckDouble, FaEllipsisH, FaRegTimesCircle, FaRegTrashAlt } from 'react-icons/fa';
import "../components/style/cardStyle.css";
import "../components/style/notificationStyle.css";
import "./style/modalStyle.css";
/**
 * Modal to create a suggestion.
 * @author [Teisanu Ciprian]
 */


export const NotifcationModal = ({
    show,
    onHide,
    notifications,
    markUnseen,
}) =>(
        <Modal
            show={show}
            size="lg"
            arie-labelby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    Notifications
                    </Modal.Title>
            </Modal.Header>
            <Modal.Body class="modalBodyNotification">
                <ul class="timeline timeline-icons timeline-sm" style={{ margin: "10px", width: "210px" }}>
                    {   
                        notifications.map(notification => {
                        if(notification.description.match("PENDING."))
                        { return(
                        <div className="notifDiv">
                        <li class="notificationListItem">
                            <p class={notification.seen ? "notificationText":"notificationTextBold"}>
                                {notification.description}<br></br>
                                <span class="timeline-icon"><FaEllipsisH style={{ color: "blue", marginBottom:"4px", marginLeft:"-1px" }}></FaEllipsisH></span>
                                <span class="timeline-date">{notification.postDate}</span>
                            </p>
                        </li>
                    </div>)
                    }
                    if(notification.description.match("deleted"))
                    { return(
                        <div className="notifDiv">
                        <li class="notificationListItem">
                            <p class={notification.seen ? "notificationText":"notificationTextBold"}>
                                {notification.description}<br></br>
                                <span class="timeline-icon"><FaRegTrashAlt style={{ color: "blue", marginBottom:"4px", marginLeft:"-1px" }}></FaRegTrashAlt></span>
                                <span class="timeline-date">{notification.postDate}</span>
                            </p>
                        </li>
                    </div>)
                    }
                    if(notification.description.match("declined."))
                    { return(
                        <div className="notifDiv">
                        <li class="notificationListItem">
                            <p class={notification.seen ? "notificationText":"notificationTextBold"}>
                                {notification.description}<br></br>
                                <span class="timeline-icon"><FaRegTimesCircle style={{ color: "blue", marginBottom:"3px", marginLeft:"-1px" }}></FaRegTimesCircle></span>
                                <span class="timeline-date">{notification.postDate}</span>
                            </p>
                        </li>
                    </div>)
                    }
                    if(notification.description.match("accepted."))
                    { return(
                        <div className="notifDiv">
                        <li class="notificationListItem">
                            <p class={notification.seen ? "notificationText":"notificationTextBold"}>
                                {notification.description}<br></br>
                                <span class="timeline-icon"><FaCheck style={{ color: "blue", marginBottom:"4px", marginLeft:"0px" }}></FaCheck></span>
                                <span class="timeline-date">{notification.postDate}</span>
                            </p>
                        </li>
                    </div>)
                    }
                    if(notification.description.match("implemented."))
                    { return(
                        <div className="notifDiv">
                        <li class="notificationListItem">
                            <p class={notification.seen ? "notificationText":"notificationTextBold"}>
                                {notification.description}<br></br>
                                <span class="timeline-icon"><FaCheckDouble style={{ color: "blue", marginBottom:"4px", marginLeft:"-1px" }}></FaCheckDouble></span>
                                <span class="timeline-date">{notification.postDate}</span>
                            </p>
                        </li>
                    </div>)
                    }
                })
                    }
                </ul>
            </Modal.Body>
            <Modal.Footer>
            <button className="push_simple red" onClick={(event) => { event.stopPropagation(); onHide(false); markUnseen(); }} style={{ height: "36px", width: "100px", marginLeft: "665px" }}>Close</button>
            </Modal.Footer>
        </Modal>
)