import { useState } from 'react';
import {
    Route,
    NavLink,
    HashRouter,
    Redirect
} from "react-router-dom";
import '../css/Guest.css';
import SignUp from "./SignUp";
import SignIn from "./SignIn";

const Guest = (props) => {
  const [, setLogged] = useState(false);
	const login = callback => {
		setLogged(callback);
		props.handleLogin(callback);
	}

	return (
		<div className="Guest">
			<HashRouter>
				<div className="Guest_nav">
					<NavLink className="navlink" to="/signup">Sign Up</NavLink>
					<NavLink className="navlink" to="/signin">Login</NavLink>
				</div>
				<div className="Guest_content">
					<Route path="/signup" component={SignUp}/>
					<Route
						path="/signin" 
						render={(props) => <SignIn {...props} handleChange={login} />}
					/>
					<Redirect to="/signin" />
				</div>
			</HashRouter>
		</div>
	);
}

export default Guest;