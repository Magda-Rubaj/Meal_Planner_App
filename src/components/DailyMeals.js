import React, { Component } from 'react';
import Popup from "reactjs-popup";
import Select from 'react-select';
import ProductApi from '../api/ProductApi'
import PlannedMealsApi from '../api/PlannedMealsApi'

class DailyMeals extends Component {

    constructor(){
        super();
        this.state = {
            mealList: [],
            mealChoice: [],
            selectedMeal: null,
            totalCalories: 0,
            totalCarbs: 0,
            totalProtein: 0,
            totalFats: 0,
            quantity: 0,
            mounted: false
        }
    }
    componentDidMount(){
        PlannedMealsApi.plannedMeals.getPlannedMeals(
            `owner=${localStorage.getItem('user_id')}&date=${this.props.date}`
            )
            .then(meals => meals.map(x => {
                ProductApi.products.getSingleProduct(x.meal)
                .then(res => {
                    const key = this.state.mealList.length;
                    const newProperties = ({ key: key, value: res.name, label: res.name });
                    const modified = Object.assign(newProperties, res)
                    this.setState(prevState => ({
                        mealList: [...prevState.mealList, modified],
                        totalCalories: this.state.totalCalories + modified.calories,
                        totalCarbs: this.state.totalCarbs + modified.carbohydrates,
                        totalProtein: this.state.totalProtein + modified.protein,
                        totalFats: this.state.totalFats + modified.fat,
                    }))
                    
                })
            }))
        ProductApi.products.getProducts(localStorage.getItem('user_id'), "")
            .then(res => res.results.map(x => { 
                    const key = this.state.mealChoice.length;
                    const newProperties = ({ key: key, value: x.name, label: x.name });
                    const modified = Object.assign(newProperties, x)
                    this.setState(prevState => ({
                        mealChoice: [...prevState.mealChoice, modified],
                    }))
            }))
        this.setState({
            mounted: true
        })
          
    }

    addMeal = e =>{
        const meal = JSON.stringify({
            owner: parseInt(localStorage.getItem('user_id')),
            meal: this.state.selectedMeal.id,
            date: this.props.date
        });

        PlannedMealsApi.plannedMeals.postPlannedMeal(meal);
        this.setState(prevState => ({
            mealList: [...prevState.mealList, this.state.selectedMeal],
            totalCalories: this.state.totalCalories +  this.state.selectedMeal.calories,
            totalCarbs: this.state.totalCarbs +  this.state.selectedMeal.carbohydrates,
            totalProtein: this.state.totalProtein +  this.state.selectedMeal.protein,
            totalFats: this.state.totalFats +  this.state.selectedMeal.fat,
            selectedMeal: null
        }))        
    }
    handleChange = selected => {
        this.setState({ selectedMeal: selected });
    }

    onQuantityChange = (e) => {
        this.setState({
            quantity: e.target.value
        });
    }
    render(){
        if(this.state.mounted){
            return (
                <div className="meal_day_view">
                    <h4>Meal list</h4>
                    <div className="items">
                        {this.state.mealList.map(meal => <p key={meal.key}>{meal.value}</p>)}
                    </div>
                    <div className="bottom_info">
                        <Popup modal trigger={<button>Add Meal</button>}>
                            <div>
                                <form onSubmit={this.addMeal}>
                                    <Select
                                        value={this.state.selectedMeal}
                                        options={this.state.mealChoice}
                                        onChange={this.handleChange}
                                    />
                                <input 
                                        type="number"
                                        value={this.state.quantity}
                                        onChange={this.onQuantityChange}
                                    />
                                    <input type="submit" value="Add"/>
                                </form>
                        </div>    
                        </Popup>
                        <p>Total Carbs: {this.state.totalCarbs}g</p>
                        <p>Total Protein: {this.state.totalProtein}g</p> 
                        <p>Total Fat: {this.state.totalFats}g</p> 
                        <p>Total Calories: {this.state.totalCalories}</p>
                    </div>      
                </div>
            );
            }
            else{
                return null;
            }
    }
}
export default DailyMeals;