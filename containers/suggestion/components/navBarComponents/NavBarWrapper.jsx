import React, { Component } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { FaDoorOpen } from 'react-icons/fa';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { logoutActionCreator } from '../../../login/actionCreators/loginActionCreators';
import { disconnectClient, getAllNotifications, storeNotifications } from '../../redux/actionCreators/notificationActionCreators';
import NotificationBell from '../dummyComponents/NotificationBell';
import "./style/navStyle.css";

class NavbarWrapper extends Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            activeTab: "",
        }
    }

    handleClick = () => {
        this.props.logout();
        this.props.disconnectClient();
    }
    componentDidMount() {
        this.props.getAllNotifications(localStorage.user);
        this.props.storeNotifications(localStorage.user, this.props.status)

    }


    render() {

        return (

            <div>
                {this.props.showNav &&
                    <Navbar className="navigator" sticky="top" >
                        <Navbar.Brand style={{ color: "white" }} href="/">
                            <img style={{ width: "62px" }} src="./images/MHP_LOGO_WHITE.png"></img>
                        </Navbar.Brand>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav active className="mr-auto">

                                <NavLink activeClassName="selected" className="notSelected" to="/active">Active</NavLink>
                                <NavLink activeClassName="selected" className="notSelected" to="/pending" >Pending</NavLink>
                                <NavLink activeClassName="selected" className="notSelected" to="/accepted">Accepted</NavLink>
                                <NavLink activeClassName="selected" className="notSelected" to="/implemented">Implemented</NavLink>
                                <NavLink activeClassName="selected" className="notSelected" to="/declined">Declined</NavLink>
                                <NavLink activeClassName="selected" className="notSelected" to="/mysuggestions">My Suggestions</NavLink>
                                {this.props.user && this.props.user.role === 'ADMIN' ?
                                    <NavLink activeClassName="selected" className="notSelected" to="/admin">Admin</NavLink> : null}
                                {this.props.user && this.props.user.role === 'SUPER_ADMIN' ?
                                    <NavLink activeClassName="selected" className="notSelected" to="/super">Super Admin</NavLink> : null}
                                <NotificationBell></NotificationBell>
                                <div className="userCredits">{this.props.user.firstName.toUpperCase()} {this.props.user.lastName.toUpperCase()}</div>
                                <div style={{ left: "1370px",position:"fixed",top:"12px"}} className="notSelected" onClick={this.handleClick}>
                                    <Link to={"/login"} style={{ color: "white", textDecoration: "none"}}>
                                        <FaDoorOpen style={{ height: "20px", width: "20px", marginTop: "-6px"}} /> LOGOUT
                                        </Link>

                                </div>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>

                }
                {this.props.children}
            </div>
        );

    }
}

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logoutActionCreator()),
        disconnectClient: () => dispatch(disconnectClient()),
        getAllNotifications: (user) => dispatch(getAllNotifications(user)),
        storeNotifications: (user, status) => dispatch(storeNotifications(user, status))
    }
}

const mapStatToProps = (state) => {

    return {
        status:state.suggestionReducer.status,
        user: state.userReducer.user,
    }

}
export default connect(mapStatToProps, mapDispatchToProps)(NavbarWrapper);
