import React, { Component } from 'react';
import Popup from "reactjs-popup";
import ShoppingApi from '../api/ShoppingApi'

class ShoppingList extends Component {

    constructor(){
        super();
        this.state = {
            totalCost: 0,
            added: {key: 0, name: "", price: 0},
            shoppingList: [],
            mounted: false
        }
    }
    componentDidMount(){
        ShoppingApi.shoppingItems.getShoppingItems(
            `owner=${localStorage.getItem('user_id')}&date=${this.props.date}`
            )
            .then(meals => meals.map(x => {
                const obj = {
                    key: this.state.shoppingList.length,
                    name: x.content,
                    price: x.price
                }
                console.log(x);
                this.setState(prevState => ({
                    shoppingList: [...prevState.shoppingList, obj],
                    totalCost: this.state.totalCost + obj.price
                }))
            }))
            this.setState({
                mounted: true
            })
    }
    addShoppingItem = e => {
        e.preventDefault();
        const item = JSON.stringify({
            owner: localStorage.getItem('user_id'),
            content: this.state.added.name,
            date: this.props.date,
            price: this.state.added.price
        })
        ShoppingApi.shoppingItems.postShoppingItem(item);
        this.setState(prevState => ({
            shoppingList: [...prevState.shoppingList, this.state.added],
            totalCost: this.state.totalCost + this.state.added.price,
            added: {key: 0, name: "", price: 0}
          }))
    }
    onNameChange = e => {
        const temp = {
            key: this.state.shoppingList.length, 
            name: e.target.value, 
            price: this.state.added.price }
        this.setState({
            added: temp
        })
    }

    onPriceChange = e => {
        const temp = {
            key: this.state.shoppingList.length, 
            name: this.state.added.name, 
            price: e.target.value }
        this.setState({
            added: temp
        })
    }
    
    render(){
        if(this.state.mounted){
            return (
                <div className="shopping_day_view">
                    <h4>Shopping list</h4>
                    {this.state.shoppingList.map(x => 
                        <div className="item" key={x.key}>
                            <input type="checkbox" id={x.key + 'l'}/>
                            <label htmlFor={x.key + 'l'}>{x.name}</label>
                        </div>
                    )}
                    <div className="bottom_info">
                        <Popup modal trigger={<button>Add item</button>}>
                                <div>
                                    <form onSubmit={this.addShoppingItem}>
                                        <input 
                                            type="text"
                                            value={this.state.added.name}
                                            onChange={this.onNameChange}
                                        />
                                        <input 
                                            type="number"
                                            value={this.state.added.price}
                                            onChange={this.onPriceChange}
                                        />
                                        <input type="submit" value="Add"/>
                                    </form>
                            </div>    
                            </Popup> 
                            <p>Total Cost: {this.state.totalCost}</p> 
                        </div>
                </div>
            );
        }
        else{
            return null;
        }
    }
}
export default ShoppingList;