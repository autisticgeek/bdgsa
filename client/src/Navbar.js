import React from 'react';
import { Link } from "react-router-dom";
import { logout } from "./redux/auth"
import { connect } from "react-redux"

function Navbar(props) {
    const { isAuthenticated } = props;
    console.log("navBar", props)
    return (
        <div className="navbar-wrapper">
            <div className="nav-link"><Link to="/">Home</Link></div>
            {!isAuthenticated && <div className="nav-link"><Link to="/signup">Sign Up</Link></div>}
            {!isAuthenticated && <div className="nav-link"><Link to="/login">Log In</Link></div>}
            {isAuthenticated &&  <div className="nav-link"><Link to="/addSale">Add Sale</Link></div>}
            <div className="nav-link">
                {isAuthenticated && <button onClick={props.logout}>Logout</button>}
            </div>
        </div>
    )
}
export default connect(state => state.auth, { logout })(Navbar);