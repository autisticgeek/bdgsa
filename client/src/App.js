import React, {Component} from 'react';
import { Route, Switch, Redirect, withRouter } from "react-router-dom";
import AddSale from "./AddSale"
import EditSale from "./EditSale"
import Signup from "./Signup";
import Login from "./Login";
import Profile from "./Profile"
import Navbar from "./Navbar"
import Details from "./SalePage"
import ProtectedRoute from "./ProtectedRoute"

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
            <Navbar isAuthenticated = {isAuthenticated}/>
            {
            loading ?
            <div>...loading</div>
            :
            <Switch>

                <Route exact path="/" component={Profile}/>
                <Route path="/login" render={props => isAuthenticated 
                ? <Redirect to ="/"/> : <Login {...props}/>}/>
                <Route path="/signup" render={props => isAuthenticated 
                ? <Redirect to ="/"/> : <Signup {...props}/>}/>
                <ProtectedRoute path="/addSale" component={AddSale}/>
                <ProtectedRoute path="/editSale/:id" component={EditSale}/>
                <Route path="/details/:id" component={Details}/>
           
            </Switch>
            }
        </div>
    )
  }
}

export default withRouter(connect (state => state.user, {verify})(App));
