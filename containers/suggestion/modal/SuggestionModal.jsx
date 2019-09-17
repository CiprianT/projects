import React from 'react';
import { Alert, Col, Form, Modal } from 'react-bootstrap';
import TagsContainer from '../../tags/TagsContainer';
import "../components/style/cardStyle.css";
import "./style/modalStyle.css";
/**
 * Modal to create a suggestion.
 * @author [Laura Luca]
 */


export const SuggestionModal = ({
    handleInputKeyDown,
    handleRemoveItem,
    createSuggestion,
    onChange,
    show,
    tag,
    items,
    onHide,
    onSuggestionSelected,
    value,
    invalidTitle,
    invalidDescription,
    invalidTags
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
                    Create suggestion:
                    </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={createSuggestion} onKeyPress={(event) => {
                    if (event.which === 13) { event.preventDefault() };
                }}>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control isInvalid={invalidTitle} isValid={invalidTitle === undefined ? undefined : !invalidTitle}
                                name="title" onChange={onChange} type="text" placeholder="Suggestion Title . . . "></Form.Control>
                            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                            <Form.Control.Feedback type="invalid">The title should be at least 4 characters long!</Form.Control.Feedback>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Control isInvalid={invalidDescription} isValid={invalidDescription === undefined ? undefined : !invalidDescription}
                                name="description" onChange={onChange} as="textarea" placeholder="Description . . ." rows="5"></Form.Control>
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
                            <Alert show={invalidTags} variant="danger" fade={true} style={{ width: "765px", marginTop: "10px" }}>
                                You need at least one tag!
                            </Alert>

                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Check name="anon" onChange={onChange} type="checkbox" label="Create As Anonymous" defaultChecked></Form.Check>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <button className="push_simple blue" type="submit" style={{ height: "36px", width: "100px", marginLeft: "auto" }}>Save</button>
                    </Form.Row>
                </Form>
                <div style={{marginTop:"-37px"}}>
                    <button className="push_simple red" onClick={(event) => { event.stopPropagation(); onHide(false) }} style={{ height: "36px", width: "100px", marginRight: "10px" }}>Close</button>
                </div>

            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>

        </Modal>
    )
