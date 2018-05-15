import React, {Component} from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
// import TodoList from "./Todos";
import Profile from "./Profile"
import Navbar from "./Navbar"
// import ProtectedRoute from "./ProtectedRoute"

//import the map
import {GoogleApiWrapper} from "google-maps-react";
//import the map child component
import MapContainer from "./MapContainer";

import {connect} from "react-redux"
import {verify, signup} from "./redux/auth"

class App extends Component{
componentDidMount(){
    this.props.verify()
}
  render(){
    const {isAuthenticated, loading} = this.props;
    return (
        <div className="app-wrapper">
            <Navbar/>
            {
            loading ?
            <div>...loading</div>
            :
            <Switch>
                {/* <Route exact path="/" render={props => isAuthenticated 
                ? <Redirect to ="/profile" /> : <Signup {...props}/>} /> */}
                <Route exact path="/" component = {Profile} />
                <Route path="/login" render={props => isAuthenticated
                ? <Redirect to ="/"/> : <Login {...props}/>}/>
                <Route path="/signup" render={props => isAuthenticated
                ? <Redirect to ="/"/> : <Signup {...props}/>}/>
                {/* <ProtectedRoute path="/todos" component={TodoList}/> */}
                {/* <ProtectedRoute path="/profile" component={Profile}/> */}
                {/* <Profile/> */}
            </Switch>
            }
            {/* <MapContainer google={this.props.google} /> */}
        </div>
    )
  }
}
 
export default 
// GoogleApiWrapper({
//     apiKey: "AIzaSyDXLSCan0a10cZmkSk66pqS6WDP0gUKc-Q"
// })
withRouter(connect (state => state.user, {verify})(App));
