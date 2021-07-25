import React from 'react';
import { NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Nav = () => {
	const history = useHistory();
  const logout = () => {
		localStorage.clear();
		history.push('/signin')
	}

	return (
		<div className="nav_wrapper">
			<nav>
				<div className="nav_item_wrapper">
					<NavLink id="home" className="navitem" to="/home">Home</NavLink>
				</div>
				<div className="nav_item_wrapper">
					<NavLink id="profile" className="navitem" to="/profile">Profile</NavLink>
				</div>
				<div className="nav_item_wrapper">
					<NavLink id="calendar" className="navitem" to="/calendar">Calendar</NavLink>
				</div>
				<div className="nav_item_wrapper">
					<NavLink id="saved" className="navitem" to="/saved">Saved meals</NavLink>
				</div>
				<div className="nav_item_wrapper">
					<button id="logout" className="navitem" onClick={logout}>Log out</button>
				</div>
			</nav>
		</div>
	)
}
export default Nav;