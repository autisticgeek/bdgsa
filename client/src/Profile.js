// main/Profile.js
import React from "react";
import { connect } from "react-redux";
import Maps from "./MapContainer";

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
            <Maps />
        </div>
    )
}

const mapStateToProps = (state) => {
    return state.user;
}

export default connect(mapStateToProps, {})(Profile); 