import { useState } from 'react';
import Popup from "reactjs-popup";

const UsernameChange = (props) => {
  const [username, setUsername] = useState('');
	const onNameChange = e => {
		setUsername(e.target.value);
	}
	const handleSave = e => {
		e.preventDefault();
		let data = new FormData();
		data.append('username', username);
		props.handleFetch(username, data, 'username', username);
		this.setState({
			username: ""
		})
	}

	return (
		<div>
			<Popup modal trigger={<button className="change_button">Edit</button>}>
				<form onSubmit={handleSave}>
					Change name:<br/>
					<input
						type="text"
						value={username}
						onChange={onNameChange}
					/><br/>
					<input type="submit" value="Save"/>
				</form>
			</Popup>
		</div>
);
}

export default UsernameChange;