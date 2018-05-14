import React, {Component} from 'react';
import SignupForm from "./SignupForm";
import {connect} from "react-redux"
import {signup} from "../redux/auth";

class SignupFormContainer extends Component {
    constructor() {
        super();
        this.state = {
            inputs: {
                name: "",
                email: "",
                phoneNumber:"",
                password: ""
            }
        }
    }

    handleChange(e) {
        e.persist();
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [e.target.name]: e.target.value
                }
            }
        })
    }

    clearInputs() {
        this.setState({
            inputs: {
                name: "",
                email: "",
                phoneNumber:"",
                password: ""
            }
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.signup(this.state.inputs)
        this.clearInputs();
    }

    render() {
        const authErrorCode = this.props.authErrCode.signup;
        let errMsg = "";
        if(authErrorCode <500 && authErrorCode >399){
            errMsg= "Invalid username or password"
        } else if (authErrorCode >499){
            errMsg = "Server error!"
        }
        return (
            <SignupForm
                handleChange={this.handleChange.bind(this)}
                handleSubmit={this.handleSubmit.bind(this)}
                errMsg ={errMsg}
                {...this.state.inputs} />
        )
    }
}

export default connect(state => state.user, {signup})(SignupFormContainer);



