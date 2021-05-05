import React, { Component } from 'react';



class AvatarChange extends Component {

    constructor(){
        super();
        this.state = {
            avatar: null
        }
    }

    onAvatarChange = (e) => {
        this.setState({
          avatar: e.target.files[0]
        });
    }
    handleSave = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('avatar', this.state.avatar, this.state.avatar.name);
        this.props.handleFetch(this.state, data, 'avatar', this.state.avatar);
        this.setState({
            avatar: null
        })
    }
    render(){
        return (
            <div className="avatar_change">
                <form onSubmit={this.handleSave}>
                        <input 
                            type="file"
                            accept="image/png, image/jpeg"
                            id="avatar"
                            onChange={this.onAvatarChange}
                        />
                    <br/>
                    <input type="submit" value="Save"/>
                </form>
            </div>
        );
    }
}
export default AvatarChange;