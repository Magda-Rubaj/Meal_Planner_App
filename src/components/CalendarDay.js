import React, { Component } from 'react';
import DailyMeals from "./DailyMeals";
import ShoppingList from "./ShoppingList";

class CalendarDay extends Component {

    
    render(){
        return (
            <div className="day_wrapper">
                <div className="day_view">
                    <DailyMeals date={this.props.date}/>
                    <ShoppingList date={this.props.date}/>
                </div>
            </div>
        );
    }
}
export default CalendarDay;