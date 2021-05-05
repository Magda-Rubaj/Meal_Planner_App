import React, { Component } from 'react';
import TokenApi from '../api/TokenApi.js';
import jwt from 'jwt-decode'

class SignIn  extends Component{
    constructor(){
        super();
        this.state = {
            logged: false,
            username: "",
            password: "",
            succesfull: true
        }
    }
    onUsernameChange = e => {
        this.setState({
            username: e.target.value
          });
    }
    onPasswordChange = e => {
        this.setState({
            password: e.target.value
          });
    }
    login = e =>{
        e.preventDefault();
        this.setState({
            succesfull: true
        });
        const user = JSON.stringify({
            username: this.state.username,
            password: this.state.password
        })
        TokenApi.token.obtain(user)
            .then(res => {
                if(res !== null){
                    localStorage.setItem('access_token', res.access);
                    localStorage.setItem('refresh_token', res.refresh);
                    const decoded = jwt(res.access);
                    localStorage.setItem('user_id', decoded.user_id);
                    this.setState({
                        logged: true
                    });
                    this.props.handleChange(true);
                }
                else{
                    this.setState({
                        succesfull: false
                    });
                }
            })
    }
    render() {
        return (
        <div className="Login">
            <h3>Login</h3>
            <form onSubmit={this.login}> 
                <h5>Username</h5>
                <input 
                    type="username"
                    value={this.state.username}
                    onChange={this.onUsernameChange}
                /><br/>
                <h5>Password</h5>
                <input 
                    type="password"
                    value={this.state.password}
                    onChange={this.onPasswordChange}
                /><br/>
                <input id="login_button" type="submit" value="Login"/><br/>
                
                {!this.state.succesfull && <p>Incorrect username or password</p>}
 
            </form>
        </div>
        );
    }
}
export default SignIn;