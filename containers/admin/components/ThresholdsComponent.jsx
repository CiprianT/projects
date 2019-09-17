import React from 'react';
import { Form, FormControl, InputGroup } from 'react-bootstrap';
import "./style/admin.css";
/**
 * @author [ Laura Luca]
 */
export const ThresholdsComponent = ({
    value,
    onChange,
    onClick,
    valid,
    name,
    param,
    authorized,
    style

}) => {
    return (
        <InputGroup className="" style={{marginBottom:"30px"}}>
            <InputGroup.Prepend>
                <InputGroup.Text style={style}>Threshold for "{name}": </InputGroup.Text>
            </InputGroup.Prepend>
            <div style={{ width: "74.8%" }}>
                <FormControl
                    isInvalid={!valid}
                    name={name} onChange={onChange}
                    type="number"
                    value={value}
                    readOnly={!authorized}>
                </FormControl>
                <Form.Control.Feedback type="invalid" style={{ position: "fixed" }}>Threshold value must me greater than 0!</Form.Control.Feedback>
            </div>
        </InputGroup>
    )
}