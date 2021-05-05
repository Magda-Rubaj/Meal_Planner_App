import React, { Component } from 'react';
import Popup from "reactjs-popup";


class CurrWeightChange extends Component {

    constructor(){
        super();
        this.state = {
            currentWeight: 0
        }
    }

    onCurrWeightChange = (e) => {
        this.setState({
          currentWeight: e.target.value
        });
    }
    handleSave = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('currentWeight', this.state.currentWeight);
        this.props.handleFetch(this.state, data, 'currentWeight', this.state.currentWeight);
        this.setState({
            currentWeight: 0
        })
    }
    render(){
        return (
            <div>
                <Popup modal trigger={<button className="change_button">Edit</button>}>
                        <form onSubmit={this.handleSave}>
                            Change current weight:<br/>
                            <input 
                                type="number"
                                value={this.state.currentWeight}
                                onChange={this.onCurrWeightChange}
                            /><br/>
                          <input type="submit" value="Save"/>
                        </form>
                </Popup>
            </div>
        );
    }
}
export default CurrWeightChange;