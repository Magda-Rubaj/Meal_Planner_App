import { useState } from 'react';
import Popup from "reactjs-popup";


const DesWeightChange = (props) => {
	const [desiredWeight, setDesiredWeight] = useState(0);
	const onDesWeightChange = e => {
		setDesiredWeight(e.target.value);
	}
	const handleSave = e => {
		e.preventDefault();
		let data = new FormData();
		data.append('desiredWeight', desiredWeight);
		props.handleFetch(desiredWeight, data, 'desiredWeight', desiredWeight);
		setDesiredWeight(0);
	}

	return (
		<div>
			<Popup modal trigger={<button className="change_button">Edit</button>}>
				<form onSubmit={handleSave}>
						Change desired weight:<br/>
						<input 
								type="number"
								value={desiredWeight}
								onChange={onDesWeightChange}
						/><br/>
					<input type="submit" value="Save"/>
				</form>
			</Popup>
		</div>
	);
}
export default DesWeightChange;