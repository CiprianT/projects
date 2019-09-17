import React from 'react';
import { Alert, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import Image from 'react-bootstrap/Image';
import InputGroup from 'react-bootstrap/InputGroup';
import { FaKey, FaUserAstronaut } from 'react-icons/fa';
import { connect } from 'react-redux';
import '../suggestion/components/style/cardStyle.css';
import { loginActionCreator } from "./actionCreators/loginActionCreators";
import './login.css';
/**
 * @author [Matei]
 */
class Login extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
            alertErr: false
        }

    }

    onChange = (event) => {
        const { value, name } = event.target;

        this.setState({
            [name]: value
        })
    }

    onSubmit = (event) => {
        event.preventDefault();
        this.props.login(
            this.state.username,
            this.state.password,
            this.redirectOnSucces
        );
    }

    /**
 * @author [Andra Marian]
 */
    redirectOnSucces = () => {
        this.props.history.push("/active");
    }

    render() {
        return (
            <div class="divContainer">
                <Alert show={this.props.alertErr} variant="danger" style={{position:"fixed", top:"50px"}} >
                    Login failed, username or password is incorrect.
                </Alert>
                <div className="login">
                    <img  style = {{width:"92px", height:"38px", marginBottom:"-35px",marginLeft:"141px"}} src="./images/MHP_LOGO.png"></img>
                    <Form onSubmit={this.onSubmit} class="form" style={{ marginLeft: "50px", marginRight: "50px", marginTop: "25px" }} >
                        <br />

                        <InputGroup bsPrefix='input-group'>
                            <InputGroup.Prepend>
                                <InputGroup.Text id="basic-addon1" style={{ backgroundColor: "#D8D8D8	" }}> <FaUserAstronaut /> </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control name="username" type="text" onChange={this.onChange} placeholder="Username" />
                        </InputGroup>
                        <br />

                        <InputGroup className="form-group">
                            <InputGroup.Prepend>
                                <InputGroup.Text style={{ width: '41px', backgroundColor: "#D8D8D8" }}> <FaKey /> </InputGroup.Text>
                            </InputGroup.Prepend>
                            <Form.Control style={{ width: "50px" }} name="password" type="password" onChange={this.onChange} placeholder="Password" />
                        </InputGroup>
                        <div>
                            {['bottom'].map(placement => (
                                <OverlayTrigger
                                    key={placement}
                                    placement={placement}
                                    overlay={
                                        <Tooltip id={`tooltip-${placement}`}>
                                            To login, try using the Windows credentials.
                                        </Tooltip>
                                    }
                                >
                                    <button style={{ width: "110px", height: "30px", marginRight: "45px" }} className="push_simple grey" onClick={(event) => { event.preventDefault() }}>Help</button>

                                </OverlayTrigger>
                            ))}

                            <button className="push_simple blue" style={{ width: "110px", height: "30px", marginLeft: "auto" }} type="submit" onClick={this.onSubmitere}>Login</button>
                        </div>
                    </Form>

                </div>
                <Image src="./images/vsb.png" className="vsbImage" />
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        alertErr: state.loginState.loginError,
        user:state.userReducer.user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        login: (username, password, redirectOnSuccess) => dispatch(loginActionCreator(username, password, redirectOnSuccess)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);