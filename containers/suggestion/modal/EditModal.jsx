import React from 'react';
import { Alert, Col, Form, Modal } from 'react-bootstrap';
import TagsContainer from '../../tags/TagsContainer';
import "../components/style/cardStyle.css";
import "./style/modalStyle.css";
/**
 * Modal to create a suggestion.
 * @author [Ciprian Teisanu]
 */


export const EditModal = ({
    handleInputKeyDown,
    handleRemoveItem,
    editSuggestion,
    onChange,
    show,
    tag,
    items,
    onHide,
    onSuggestionSelected,
    value,
    onChangeTitle,
    onChangeDescription,
    validTitle,
    validDescription,
    validTags,
    valueTitle,
    valueDescription,
    valueAnon
}) =>
    (
        <Modal
            show={show}
            size="lg"
            arie-labelby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title>
                    Edit suggestion:
                    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onKeyPress={(event) => {
                    if (event.which === 13) { event.preventDefault() };
                }}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control isValid={validTitle} isInvalid={!validTitle}
                                name="title" onChange={onChangeTitle} type="text" placeholder="Suggestion Title . . . " value={valueTitle}></Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">The title should be at least 4 characters long!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control isValid={validDescription} isInvalid={!validDescription}
                                name="description" onChange={onChangeDescription} as="textarea" placeholder="Description . . ." value={valueDescription} rows="5"></Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">The description should be at least 10 characters long!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <TagsContainer
                                handleInputKeyDown={handleInputKeyDown}
                                handleRemoveItem={handleRemoveItem}
                                tag={tag}
                                items={items}
                                onSuggestionSelected={onSuggestionSelected}
                                onChange={onChange}
                                value={value}
                            >
                            </TagsContainer>
                            <Alert show={!validTags} variant="danger" fade={true} style={{ width: "765px", marginTop: "10px" }}>
                                You need at least one tag!
                            </Alert>

                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Check name="anon" onChange={onChange} type="checkbox" label="Create As Anonymous" defaultChecked={valueAnon}></Form.Check>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>

                    </Form.Row>
                </Form>
                <button className="push_simple red" onClick={(event) => { event.stopPropagation(); onHide(false); }} style={{ height: "36px", width: "100px", marginRight: "10px" }}>Close</button>
                <button className="push_simple blue" onClick={editSuggestion} style={{ height: "36px", width: "100px", marginLeft: "556px" }}>Save</button>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>

        </Modal>
    )
