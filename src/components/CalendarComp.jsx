import Calendar from 'react-calendar';

const CalendarComp = (props) => {
	const onClick = (value, event) => {
		const date = JSON.stringify(value);
		const year = date.slice(1,5);
		const month = date.slice(6,8);
		const day = parseInt(date.slice(9,11))+1;
		props.getDay(month, day, year);
		props.history.push('/' + day + month + year);
	}

	return (
		<div className="calendar_wrapper">
			<Calendar minDetail="year" onClickDay={onClick}/>        
		</div>
	);
}

export default CalendarComp;