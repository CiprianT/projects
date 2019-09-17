import React from "react";
import { FaBell } from 'react-icons/fa';
import { connect } from 'react-redux';
import { NotifcationModal } from "../../modal/NotificationModal";
import { markAsSeen } from '../../redux/actionCreators/notificationActionCreators';
import "../dummyComponents/bellStyle.css";


class NotificationBell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
      focused: false,
    }
    
  }

  setModalShow = (b) => {
    this.setState(state => ({
      modalShow: b,
    }))
  }

  pushBell = () => {
    this.setModalShow(true);
  }

  markUnseen = () =>{
    this.props.markAsSeen(localStorage.user)
  }
  
  render() {
    var count = 0;
    this.props.notifications.forEach(element => {
      if(element.seen === false){
        count++;
      }
    });
    return (
      <React.Fragment>
        {count !== 0? (<React.Fragment><div className="notificationCount show-count" data-count={count}></div>
                       <FaBell className="notification" style={{ marginTop: "4px", marginLeft: "1100px", color: "white" }} onClick={() => this.pushBell()}></FaBell>
                       </React.Fragment>):
        (<FaBell className="notification" style={{ marginTop: "4px", marginLeft: "1100px", color: "white" }} onClick={() => this.pushBell()}></FaBell>)
        }
        <NotifcationModal
          show={this.state.modalShow}
          onHide={this.setModalShow}
          notifications={this.props.notifications}
          markUnseen={this.markUnseen}
        ></NotifcationModal>
      </React.Fragment>
    );
  }
}


const mapStatToProps = (state) => {
  return {
    notifications: state.notificationReducer.notifications,
    user: state.userReducer.user,
  }

}
const mapDispatchToProps = dispatch => {
  return {
    markAsSeen: (user) => {dispatch(markAsSeen(user))}
  }
}
export default connect(mapStatToProps, mapDispatchToProps)(NotificationBell);

