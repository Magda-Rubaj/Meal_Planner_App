import React, { Component } from 'react';
import ProductApi from '../api/ProductApi'
import ProductSave from './ProductSave'
class Products extends Component{

    constructor(){
        super();
        this.state = {
          products: [],
          currPage: 1,
          prevPage: null,
          nextPage: null,
          mounted: false
        }
    }
    setProducts = page => {
      ProductApi.products.getProducts(localStorage.getItem('user_id'), `&page=${page}`)
        .then(res => {
          console.log(res);
          this.setState({
            products: res.results,
            currPage: page,
            nextPage: res.next,
            prevPage: res.previous
          });
        })
    }
    componentDidMount() {
      this.setProducts(1);
      this.setState({
        mounted: true
      })
    }

    toNext = () =>{
      if(this.state.nextPage !== null){
        this.setProducts(this.state.nextPage);
      }
    }

    toPrev = () =>{
      if(this.state.prevPage !== null){
        this.setProducts(this.state.prevPage);
      }
    }
    
    addProduct = (request, added) =>{
      ProductApi.products.postProduct(request)
            .then(res => {
              console.log(res);
              if(res.status===201){
                const newOne = {
                  id: this.state.products.length,
                  name: added.name,
                  calories: added.calories,
                  carbohydrates: added.carbs,
                  protein: added.protein,
                  fat: added.fat,
                  owner: localStorage.getItem('user_id')  
              }
              if(added.image !== null){
                newOne.image = 'http://127.0.0.1:8000/media/post_images/' + added.image.name; 
              }
              else{
                newOne.image = 'http://127.0.0.1:8000/media/defaults/default_meal.png/'; 
              }
                this.setState(prevState => ({
                  products: [...prevState.products, newOne]
                }))
              }
            })
    }
    render() {
      if(this.state.mounted){
        return (
         <div className="meals_wrapper">
            <h2>Saved meals</h2>
            <div className="combined">
              <div className="meal_container">
                {this.state.products.map(product => 
                  <figure key={product.id}>
                    <img src={product.image} alt="meal" height="85" width="85"/>
                    <figcaption>{product.name}</figcaption>
                  </figure>
                )}
                <ProductSave saveMeal={this.addProduct}/> 
              </div> 
              <div className="pagination">
                <button onClick={this.toPrev}>prev</button>
                <label>{this.state.currPage}</label>
                <button onClick={this.toNext}>next</button>
              </div>
            </div>            
         </div>
        );
      }
      else{
        return null;
      }  
    }
}

export default Products;