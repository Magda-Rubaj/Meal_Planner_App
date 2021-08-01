import { useState, useEffect } from 'react';
import Popup from "reactjs-popup";

import shoppingService from '../api/services/shopping'

const ShoppingList = (props) => {
    const [shoppingList, setShoppingList] = useState({
        totalCost: 0,
        added: {
            key: 0,
            name: '',
            price: 0
        },
        shoppingList: [],
        mounted: false
    })

    useEffect(() => {
        const fetch = async() => {
            return await shoppingService.getShoppingItems(`owner=${localStorage.getItem('user_id')}&date=${props.date}`);
        }
        const list = fetch();
        list.forEach(item => {
            const obj = {
                key: shoppingList.shoppingList.length,
                name: item.content,
                price: item.price
            }
            setShoppingList(old => {
                return {...old, ...{
                    shoppingList: [...old.shoppingList, obj],
                    totalCost: shoppingList.totalCost + obj.price
                }}
            });
        })
        setShoppingList(old => {
            return {...old, ...{
                mounted: true
            }}
        });
    },[props.date, shoppingList])

    const onNameChange = e => {
        const temp = {
            key: this.state.shoppingList.length, 
            name: e.target.value, 
            price: this.state.added.price }
        setShoppingList(old => {
            return {...old, ...{
                added: temp
            }}
        });
    }

    const onPriceChange = e => {
        const temp = {
            key: this.state.shoppingList.length, 
            name: this.state.added.name, 
            price: e.target.value 
        }

        setShoppingList(old => {
            return {...old, ...{
                added: temp
            }}
        });
    }
    
    const addShoppingItem = async(e) => {
        e.preventDefault();
        const item = JSON.stringify({
            owner: localStorage.getItem('user_id'),
            content: shoppingList.added.name,
            date: props.date,
            price: shoppingList.added.price
        })
        await shoppingService.postShoppingItem(item);

        this.setState(prevState => ({
            shoppingList: [...prevState.shoppingList, this.state.added],
            totalCost: this.state.totalCost + this.state.added.price,
            added: {key: 0, name: "", price: 0}
        }))

        setShoppingList(old => {
            return {...old, ...{
                shoppingList: [...old.shoppingList, shoppingList.added],
                totalCost: shoppingList.totalCost + shoppingList.added.price,
                added: {key: 0, name: "", price: 0}
            }}
        });
    }

    if(shoppingList.mounted){
        return (
            <div className="shopping_day_view">
                <h4>Shopping list</h4>
                {shoppingList.shoppingList.map(x => 
                    <div className="item" key={x.key}>
                        <input type="checkbox" id={x.key + 'l'}/>
                        <label htmlFor={x.key + 'l'}>{x.name}</label>
                    </div>
                )}
                <div className="bottom_info">
                    <Popup modal trigger={<button>Add item</button>}>
                            <div>
                                <form onSubmit={addShoppingItem}>
                                    <input 
                                        type="text"
                                        value={shoppingList.added.name}
                                        onChange={onNameChange}
                                    />
                                    <input 
                                        type="number"
                                        value={shoppingList.added.price}
                                        onChange={onPriceChange}
                                    />
                                    <input type="submit" value="Add"/>
                                </form>
                        </div>    
                        </Popup> 
                        <p>Total Cost: {shoppingList.totalCost}</p> 
                    </div>
            </div>
        );
    }
    else{
        return null;
    }
}
export default ShoppingList;