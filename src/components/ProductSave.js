import React, { Component } from 'react';
import Popup from "reactjs-popup";


class ProductSave extends Component {

    constructor(){
        super();
        this.state = {
           name: "",
           image: null,
           calories: 0,
           carbs: 0,
           protein: 0,
           fat: 0
        }
    }
    onImageChange = (e) => {
        this.setState({
            image: e.target.files[0]
        });
    }

    onNameChange = (e) => {
        this.setState({
          name: e.target.value
        });
    }
    onCaloriesChange = (e) => {
        this.setState({
          calories: e.target.value
        });
    }
    onCarbsChange = (e) => {
        this.setState({
          carbs: e.target.value
        });
    }
    onProteinsChange = (e) => {
        this.setState({
          protein: e.target.value
        });
    }
    onFatsChange = (e) => {
        this.setState({
          fat: e.target.value
        });
    }
    handleSave = (e) => {
        e.preventDefault();
        let data = new FormData();
        data.append('name', this.state.name);
        if(this.state.image !== null){
            data.append('image', this.state.image, this.state.image.name);
        }
        data.append('calories', this.state.calories);
        data.append('carbohydrates', this.state.carbs);
        data.append('protein', this.state.protein);
        data.append('fat', this.state.fat);
        data.append('owner', localStorage.getItem('user_id'));
        this.props.saveMeal(data, this.state)
        this.setState({
            name: "",
            image: null,
            calories: 0,
            carbs: 0,
            protein: 0,
            fat: 0
        })   
    }
    render(){
        return (
            <div>
                <Popup modal trigger={<button></button>}>
                    <form onSubmit={this.handleSave}>
                            Image:<br/>
                            <input 
                                type="file"
                                accept="image/png, image/jpeg"
                                id="image"
                                onChange={this.onImageChange}
                            /><br/>
                            Name:<br/>
                            <input 
                                type="text"
                                value={this.state.name}
                                onChange={this.onNameChange}
                            /><br/>
                            Calories:<br/>
                            <input 
                                type="number"
                                value={this.state.calories}
                                onChange={this.onCaloriesChange}
                            /><br/>
                            Carbohydrates:<br/>
                            <input 
                                type="number"
                                value={this.state.carbs}
                                onChange={this.onCarbsChange}
                            /><br/>
                            Protein:<br/>
                            <input 
                                type="number"
                                value={this.state.protein}
                                onChange={this.onProteinsChange}
                            /><br/>
                            Fat:<br/>
                            <input 
                                type="number"
                                value={this.state.fat}
                                onChange={this.onFatsChange}
                            /><br/>
                            <input type="submit" value="Save"/>
                    </form>
                </Popup>
            </div>
        );
    }
}
export default ProductSave;