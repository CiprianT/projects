import React from 'react';
import { connect } from 'react-redux';
import swal from 'sweetalert';
import { loadThresholdsActionCreator, updateThresholdActionCreator } from '../redux/actionCreators/thresholdActionCreators';
import './style/admin.css';
import { ThresholdsComponent } from './ThresholdsComponent';

/**
 * @author [Laura Luca]
 */
class AdminDashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pendingValue: 0,
            updateValue: 0,
            deleteValue: 0,
            pendingValid: true,
            updateValid: true,
            deleteValid: true
        }
    }

    validate = (value) => {
        return value > 0 ? true : false
    }
    onChange = (event) => {
        const { value, name } = event.target;

        this.setState({
            [name + "Value"]: value,
            [name + "Valid"]: this.validate(value)
        });
    }
    onClick = () => {
        if (this.state.pendingValid && this.state.updateValid && this.state.deleteValid) {

            let toUpdatePending = { ...this.props.pendingThreshold };
            toUpdatePending.value = this.state.pendingValue;
            this.props.editThreshold(toUpdatePending);

            let toUpdateUpdate = { ...this.props.updateThreshold };
            toUpdateUpdate.value = this.state.updateValue;
            this.props.editThreshold(toUpdateUpdate);


            let toUpdateDelete = { ...this.props.deleteThreshold };
            toUpdateDelete.value = this.state.deleteValue;
            this.props.editThreshold(toUpdateDelete);
        }
        else{
            swal('Oops...','Some of the thresholds are invalid!','warning');
        }


    }

    componentDidMount() {
        this.props.loadThresholds();
        this.setState({
            pendingValue: 0,
            updateValue: 0,
            deleteValue: 0
        })

    }
    componentDidUpdate(prevProps) {
        const { pendingThreshold: prevPendingThreshold } = prevProps;
        const { pendingThreshold: nextPendingThreshold } = this.props;

        const { updateThreshold: prevUpdateThreshold } = prevProps;
        const { updateThreshold: nextUpdateThreshold } = this.props;

        const { deleteThreshold: prevDeleteThreshold } = prevProps;
        const { deleteThreshold: nextDeleteThreshold } = this.props;
        if (prevPendingThreshold !== nextPendingThreshold
            || prevDeleteThreshold !== nextDeleteThreshold
            || prevUpdateThreshold !== nextUpdateThreshold) {
            this.setState({
                pendingValue: nextPendingThreshold.value,
                updateValue: nextUpdateThreshold.value,
                deleteValue: nextDeleteThreshold.value,
            })
        }

    }
    render() {
        return (
            <React.Fragment>
                <div className="thresholds" >
                    <ThresholdsComponent
                        value={this.state.pendingValue}
                        onChange={this.onChange}
                        onClick={this.onClick}
                        valid={this.state.pendingValid}
                        name={"pending"}
                        style={{ width: "230px" }}
                        authorized={true}
                    />
                    <ThresholdsComponent
                        value={this.state.updateValue}
                        onChange={this.onChange}
                        onClick={this.onClick}
                        valid={this.state.updateValid}
                        name={"update"}
                        style={{ width: "230px" }}
                        authorized={true}
                    />
                    <ThresholdsComponent
                        value={this.state.deleteValue}
                        onChange={this.onChange}
                        onClick={this.onClick}
                        valid={this.state.deleteValid}
                        name={"delete"}
                        style={{ width: "230px" }}
                        authorized={true}
                    />
                    <div className="saveDiv">
                        <button className="push_simple blue" style={{ width: "100px" }}
                            onClick={this.onClick}
                        >
                            Save
                        </button>
                    </div>
                </div>
            </React.Fragment>

        )
    }

}

const mapStatToProps = (state) => {

    return {
        pendingThreshold: state.adminReducer.pendingThreshold,
        updateThreshold: state.adminReducer.updateThreshold,
        deleteThreshold: state.adminReducer.deleteThreshold,
        user: state.userReducer.user,

    }

}
const mapDispatchToProps = (dispatch) => {
    return {
        loadThresholds: () => dispatch(loadThresholdsActionCreator()),
        editThreshold: (threshold) => dispatch(updateThresholdActionCreator(threshold))
    };
};


export default connect(mapStatToProps, mapDispatchToProps)(AdminDashboard);