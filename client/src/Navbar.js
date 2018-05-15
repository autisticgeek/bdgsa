import React from 'react';
import { Link } from "react-router-dom";
import { logout } from "./redux/auth"
import { connect } from "react-redux"
function Navbar(props) {
    return (
        <div className="navbar-wrapper">
            <div className="nav-link"><Link to="/">Home</Link></div>
            <div className="nav-link"><Link to="/signup">Sign Up</Link></div>
            <div className="nav-link"><Link to="/login">Log In</Link></div>
            <div className="nav-link">
                <button onClick={props.logout}>Logout</button>
            </div>
        </div>
    )
}
export default connect(null, { logout })(Navbar);