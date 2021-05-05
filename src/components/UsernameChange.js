import React, { Component } from 'react';
import Popup from "reactjs-popup";


class UsernameChange extends Component {

    constructor(){
        super();
        this.state = {
            username: ""
        }
    }

    onNameChange = (e) => {
        this.setState({
          username: e.target.value
        });
    }
    handleSave = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('username', this.state.username);
        this.props.handleFetch(this.state, data, 'username', this.state.username);
        this.setState({
            username: ""
        })
    }
    render(){
        return (
            <div>
                <Popup modal trigger={<button className="change_button">Edit</button>}>
                    <form onSubmit={this.handleSave}>
                        Change name:<br/>
                        <input
                            type="text"
                            value={this.state.username}
                            onChange={this.onNameChange}
                        /><br/>
                        <input type="submit" value="Save"/>
                    </form>
                </Popup>
            </div>
        );
    }
}
export default UsernameChange;