import { useState } from 'react';
import Popup from "reactjs-popup";

const CurrWeightChange = (props) => {
    const [currentWeight, setCurrentWeight] = useState(0);

    const onCurrWeightChange = (e) => {
        this.setCurrentWeight(e.target.value);
    }

    const handleSave = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('currentWeight', currentWeight);
        props.handleFetch(currentWeight, data, 'currentWeight', currentWeight);
        setCurrentWeight(0);
    }

    return (
        <div>
            <Popup modal trigger={<button className="change_button">Edit</button>}>
                    <form onSubmit={handleSave}>
                        Change current weight:<br/>
                        <input 
                            type="number"
                            value={currentWeight}
                            onChange={onCurrWeightChange}
                        /><br/>
                        <input type="submit" value="Save"/>
                    </form>
            </Popup>
        </div>
    );
}

export default CurrWeightChange;