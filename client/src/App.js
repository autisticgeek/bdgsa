import React, {Component} from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";

import Signup from "./Signup";
import Login from "./Login";
// import TodoList from "./Todos";
import Profile from "./Profile"
import Navbar from "./Navbar"
// import ProtectedRoute from "./ProtectedRoute"

import {connect} from "react-redux"
import {verify} from "./redux/auth"

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
                <Route exact path="/" render={props => isAuthenticated 
                ? <Redirect to ="/profile" /> : <Signup {...props}/>} />
                <Route path="/login" render={props => isAuthenticated 
                ? <Redirect to ="/profile"/> : <Login {...props}/>}/>
                {/* <ProtectedRoute path="/todos" component={TodoList}/> */}
                {/* <ProtectedRoute path="/profile" component={Profile}/> */}
                <Profile/>
            </Switch>
            }
        </div>
    )
  }
}

export default withRouter(connect (state => state.user, {verify})(App));
