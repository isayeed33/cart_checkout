import React, { Component } from 'react'
import SingleItem from './SingleItem'

export default class ItemList extends Component {
    render() {
        const { products, addToCart, increment, decrement } = this.props;
        return (
            <div>
                {products.map(item => (
                <SingleItem key={item.id} item={item} addToCart={addToCart} increment={increment} decrement={decrement}/>
            ))}
            </div>
        )
    }
}
