import { useState } from 'react';
import jwt from 'jwt-decode'
import tokenService from '../api/services/token';

const SignIn = () => {
  const [signIn, setSignIn] = useState({
		logged: false,
		username: '',
		password: '',
		success: true
	})

	const handleInputChange = e => {
    const target = e.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
		setSignIn(old => {
			return {
				...old,
				[name]: value
			}
		})
  }

	const login = async(e) => {
		e.preventDefault();
		setSignIn(old => {
			return {
				...old,
				success: true
			}
		})
		const user = JSON.stringify({
			username: signIn.username,
			password: signIn.password
		})
		const res = await tokenService.obtain(user);
		if(res) {
			localStorage.setItem('access_token', res.access);
			localStorage.setItem('refresh_token', res.refresh);
			const decoded = jwt(res.access);
			localStorage.setItem('user_id', decoded.user_id);
			setSignIn(old => {
				return {
					...old,
					logged: true
				}
			})
			this.props.handleChange(true);
		}
		else {
			setSignIn(old => {
				return {
					...old,
					success: false
				}
			})
		}
	}
	return (
		<div className="Login">
			<h3>Login</h3>
			<form onSubmit={login}> 
					<h5>Username</h5>
					<input 
							type="username"
							name="username"
							value={signIn.username}
							onChange={handleInputChange}
					/><br/>
					<h5>Password</h5>
					<input 
							type="password"
							name="password"
							value={signIn.password}
							onChange={handleInputChange}
					/><br/>
					<input id="login_button" type="submit" value="Login"/><br/>
					{!signIn.success && <p>Incorrect username or password</p>}
				</form>
		</div>
	);
};

export default SignIn;