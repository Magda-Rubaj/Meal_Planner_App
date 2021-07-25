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

	const onUserNameChange = e => {
		setSignIn(old => {
			return {
				...old,
				username: e.target.value
			}
		})
	}

	const onPasswordChange = e => {
		setSignIn(old => {
			return {
				...old,
				password: e.target.value
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
							value={signIn.username}
							onChange={onUserNameChange}
					/><br/>
					<h5>Password</h5>
					<input 
							type="password"
							value={signIn.password}
							onChange={onPasswordChange}
					/><br/>
					<input id="login_button" type="submit" value="Login"/><br/>
					{!signIn.success && <p>Incorrect username or password</p>}
				</form>
		</div>
	);
};

export default SignIn;