import React from 'react';
import { Table } from 'react-bootstrap';
import { confirmAlert } from 'react-confirm-alert';
import { connect } from 'react-redux';
import UsersInfo from "../components/dummyComponents/UsersInfo";
import { changeRoleToAdminActionCreator, changeRoleToSuperAdminActionCreator, changeRoleToUserActionCreator, clearUser, loadOneUserActionCreators, loadUsersEnterActionCreators, loadUsersInfoActionCreators } from "../redux/actionCreators/superAdminActionCreators";
import { loadThresholdsActionCreator } from '../redux/actionCreators/thresholdActionCreators';
import SearchFieldUsers from "./SearchFieldUsers";
import { ThresholdsComponent } from './ThresholdsComponent';
/**
 * @author [Laura Luca]
 */
class SuperAdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.getEmptyUserInfo = this.getEmptyUserInfo.bind(this);
        this.getUserInfoEnter = this.getUserInfoEnter.bind(this);
        this.getTitleEnter = this.getTitleEnter.bind(this);


    }
    componentDidMount() {
        this.props.loadThresholds();
        this.props.loadUsersInfo(this.props.user.id);

    }



    getUserInfo = (username) => {
        this.props.loadUserInfoSearch(username);
    }
    getUserInfoEnter = (username) => {
        this.props.loadUsersInfoSearchEnter(username);
    }
    getEmptyUserInfo = (username) => {
        if (username.length === 0) {
            this.props.clearUser();
            this.props.loadUsersInfo(this.props.user.id);
        }
    }
    getTitleEnter = (username) => {
        if(username)
        this.props.loadUsersInfoSearchEnter(username);
    }
    loadUsers = (id) => {
        this.props.loadUsersInfo(id);
    }
 

    changeRole = (user, type) => {

        switch (type) {
            case 0:
                this.props.changeRoleToUser(this.props.user.id, user.userId);
                break;
            case 1:
                this.props.changeRoleToAdmin(this.props.user.id, user.userId);
                break;
            case 2:
                confirmAlert({
                    id: user.userId,
                    title: 'Confirm to elevate',
                    message: 'Are you sure to elevate '  + user.firstName + ' ' + user.lastName + '? You will lose your Super Admin role',
                    buttons: [
                        {
                            label: 'No',
                            onClick: () => { }
                        }, {
                            label: 'Yes',
                            onClick: () => this.props.changeRoleToSuperAdmin(this.props.user.id, user.userId),
                            
                        }
                    ]


                });

                break;
            default:
                break;
        }
    }
    render() {
        return (
            <div className="thresholds-sa">
                { 
                   this.props.adminReducer && this.props.adminReducer.pendingThreshold && this.props.adminReducer.updateThreshold
                    && this.props.adminReducer.deleteThreshold &&
                    <div className="thr">
                        <ThresholdsComponent
                            value={this.props.adminReducer.pendingThreshold.value}
                            valid={true}
                            name={"pending"}
                            style={{ width: "230px" }}
                            authorized={false}
                        />
                        <ThresholdsComponent
                            value={this.props.adminReducer.updateThreshold.value}
                            valid={true}
                            name={"update"}
                            style={{ width: "230px" }}
                            authorized={false}

                        />
                        <ThresholdsComponent
                            value={this.props.adminReducer.deleteThreshold.value}
                            valid={true}
                            name={"delete"}
                            style={{ width: "230px" }}
                            authorized={false}
                        />
                    </div>

                }

                <Table striped borderd hover variant='light'>
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Name</th>
                            <th>Role</th>
                            <th style={{ width: '300px' }}>
                                <SearchFieldUsers getTitleEnter={this.getTitleEnter} loadUsers={this.loadUsers} usersInfo={this.props.usersInfo} id={this.props.user.id} username={this.props.user.sub} getEmptyUserInfo={this.getEmptyUserInfo} getUserInfo={this.getUserInfo} getUserInfoEnter={this.getUserInfoEnter} />
                            </th>
                        </tr>
                    </thead>
                    <UsersInfo
                        usersInfo={this.props.usersInfo}
                        onClick={this.changeRole}
                        id={this.props.user.id}
                    />
                </Table>

            </div>
        )
    }

}

const mapStatToProps = (state) => {

    return {
        adminReducer:state.adminReducer,
        user: state.userReducer.user,
        usersInfo: state.adminReducer.usersInfo,

    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        loadThresholds: () => dispatch(loadThresholdsActionCreator()),
        loadUsersInfo: (id) => dispatch(loadUsersInfoActionCreators(id)),
        loadUserInfoSearch: (username) => dispatch(loadOneUserActionCreators(username)),
        clearUser: () => dispatch(clearUser()),
        loadUsersInfoSearchEnter: (username) => dispatch(loadUsersEnterActionCreators(username)),
        changeRoleToUser: (current, id) => dispatch(changeRoleToUserActionCreator(current, id)),
        changeRoleToAdmin: (current, id) => dispatch(changeRoleToAdminActionCreator(current, id)),
        changeRoleToSuperAdmin: (current, id) => dispatch(changeRoleToSuperAdminActionCreator(current, id))
    };
};


export default connect(mapStatToProps, mapDispatchToProps)(SuperAdminDashboard);