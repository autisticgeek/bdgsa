// main/Profile.js
import React from "react";
import { connect } from "react-redux";

function guest(name) {
    if (name) {
        return name
    } else {
        return "Guest"
    }
}

function Profile(props) {
    return (
        <div>
            <h1>Welcome, <strong>{guest (props.name)}</strong></h1>
        </div>
    )
}

const mapStateToProps = (state) => {
    return state.user;
}

export default connect(mapStateToProps, {})(Profile); 