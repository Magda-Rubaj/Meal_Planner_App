import React, { Component } from 'react';
import Calendar from 'react-calendar';


class CalendarComp extends Component {

    click = (value, event) => {
        const date = JSON.stringify(value);
        const year = date.slice(1,5);
        const month = date.slice(6,8);
        const day = parseInt(date.slice(9,11))+1;
        this.props.getDay(month, day, year);
        this.props.history.push('/' + day + month + year);
    }
    render(){
        return (
            <div className="calendar_wrapper">
                <Calendar minDetail="year" onClickDay={this.click}/>        
            </div>
        );
    }
}
export default CalendarComp;