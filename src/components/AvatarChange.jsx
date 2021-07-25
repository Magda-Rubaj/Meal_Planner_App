import {useState } from 'react';

const AvatarChange = (props) => {
	const [avatar, setAvatar] = useState({
		avatar: null
	});

	const onAvatarChange = e => {
		setAvatar({
			avatar: e.target.files[0]
		})
	}

	const handleSave = e => {
		e.preventDefault();
		let data = new FormData();
		data.append('avatar', avatar.avatar,	avatar.avatar.name);
		props.handleFetch(avatar, data, 'avatar', this.state.avatar);
		this.setState({
				avatar: null
		})
	}

	return (
		<div className="avatar_change">
			<form onSubmit={handleSave}>
					<input 
						type="file"
						accept="image/png, image/jpeg"
						id="avatar"
						onChange={onAvatarChange}
					/>
					<br/>
					<input type="submit" value="Save"/>
			</form>
		</div>
	);
}
export default AvatarChange;