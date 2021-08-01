import React from 'react';
import DailyMeals from "./DailyMeals";
import ShoppingList from "./ShoppingList.jsx";

const CalendarDay = (props) => {
	return (
		<div className="day_wrapper">
			<div className="day_view">
				<DailyMeals date={props.date}/>
				<ShoppingList date={props.date}/>
			</div>
		</div>
	)
}

export default CalendarDay;