// main/Profile.js
import React from "react";  
import {connect} from "react-redux";

function Profile(props) {  
    return (
        <div>
            <h2>Welcome, <i>{props.name}</i></h2>
            {/* <p>{props.title}</p> */}
        </div>
    )
}

const mapStateToProps = (state) => {  
    return state.user;
}

export default connect(mapStateToProps, {})(Profile); 