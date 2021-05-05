import React, { Component } from 'react';
import Main from "./Main";
import Guest from "./Guest";
import UserApi from '../api/UserApi.js';
class App extends Component {
  constructor(){
    super();
    this.state = {
      mounted: false,
      logged: false
    };
  }
  componentDidMount(){
    UserApi.user.getUser()
      .then(res => {
        if(res !== null){
          this.setState({
            logged: true
          })
        }
        this.setState({
          mounted: true
        })
      })
  }
  login = callback =>{
    this.setState({
      logged: callback
    })
    console.log(callback);
  }
  render(){
    if(this.state.mounted){
      if(this.state.logged === true){
        return <Main/>
      }
      else{
        return <Guest handleLogin={this.login}/>
      }
    }
    else{
      return null;
    }
  }
}

export default App;

