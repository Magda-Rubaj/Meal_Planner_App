import { useState } from 'react';
import userService from '../api/services/user'

const SignUp = () => {
	const [signUp, setSignUp] = useState({
		username: "",
		email: "",
		password: "",
		currentWeight: "",
		desiredWeight: ""
	})

	const handleInputChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
		setSignUp(old => {
			return {
				...old,
				[name]: value
			}
		})
  }

	const register = async(e) =>{
		e.preventDefault();
		const user = JSON.stringify({
				username: signUp.username,
				email: signUp.email,
				password: signUp.password,
				currentWeight: signUp.currentWeight,
				desiredWeight: signUp.desiredWeight,
			})
		console.log(user);
		await userService.postUser(user);      
	}

	return (
		<div>
				<h3>Sign Up</h3>
				<form onSubmit={register}>
				<h5>Email</h5>
					<input 
							type="email"
							name="email"
							value={signUp.email}
							onChange={handleInputChange}
					/><br/>
					<h5>Username</h5>
					<input 
							type="username"
							name="username"
							value={signUp.username}
							onChange={handleInputChange}
					/><br/>
					<h5>Password</h5>
					<input 
							type="password"
							name="password"
							value={signUp.password}
							onChange={handleInputChange}
					/><br/>
					<h5>Current Weight</h5>
					<input 
							type="number"
							name="currentWeight"
							value={signUp.currentWeight}
							onChange={handleInputChange}
					/><br/>
					<h5>Desired Weight</h5>
					<input 
							type="number"
							name="desiredWeight"
							value={signUp.desiredWeight}
							onChange={handleInputChange}
					/><br/>
					<input type="submit" value="Sign Up"/><br/>
			</form>
		</div>
	);
}

export default SignUp;