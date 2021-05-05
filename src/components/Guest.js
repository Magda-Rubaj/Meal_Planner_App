import React, { Component } from 'react';
import {
    Route,
    NavLink,
    HashRouter,
    Redirect
} from "react-router-dom";
import '../css/Guest.css';
import SignUp from "./SignUp";
import SignIn from "./SignIn";


class Guest extends Component {
    constructor(){
        super();
        this.state = {
            logged: false
        }
    }
    login = callback =>{
        this.setState({
            logged: callback
        })
        console.log(callback)
        this.props.handleLogin(callback);
    }
    render(){
        return (
            <div className="Guest">
                <HashRouter>
                    <div className="Guest_nav">
                        <NavLink className="navlink" to="/signup">Sign Up</NavLink>
                        <NavLink className="navlink" to="/signin">Login</NavLink>
                    </div>
                    <div className="Guest_content">
                        <Route path="/signup" component={SignUp}/>
                        <Route 
                            path="/signin" 
                            render={(props) => <SignIn {...props} handleChange={this.login} />}
                        />
                    <Redirect to="/signin" />
                    </div>
                    
                    
                </HashRouter>
            </div>
        );
    }
}

export default Guest;