import React from 'react';
import { Col, Form, Modal } from 'react-bootstrap';
import "./style/modalStyle.css";


export const ReasonModal = ({

    createReason,
    show,
    onHide,
    onChangeTitle,
    onChangeReason,
    validTitle,
    validReason,
    title,
    reason,
    onChange,
    type,
    onButton,

}) => {
    
    const onSubmit=(event)=>{
        event.preventDefault(); 
        onButton();
        onHide(false); 
        
    }
    return(
    (
        <Modal
            show={show}
            size="lg"
            arie-labelby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    Make a reason:
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form  onKeyPress={(event) => {
                    if (event.which === 13) { event.preventDefault() };
                }}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control readOnly={true}
                                name="title" value={title} onChange={onChangeTitle} type="text" placeholder="Suggestion Title . . . "></Form.Control>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control isValid={validReason} isInvalid={!validReason}
                                name="reason" value={reason} onChange={onChangeReason} as="textarea" placeholder="Reason . . ." rows="5"></Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">The reason should be at least 10 characters long!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                </Form>
                <button className="push_simple red"  onClick={(event) => { event.stopPropagation(); onHide(false) }}style={{ height: "36px", width: "100px", marginLeft: "auto" }}>Close</button>
                <button className="push_simple blue" onClick={onSubmit} type="submit" style={{ height: "36px", width: "100px", marginRight: "10px",marginLeft:"556px"}}>{type ? "Decline" : "Delete"}</button>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>

        </Modal>   
    )

    )
}