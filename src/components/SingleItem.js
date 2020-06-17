import React, { Component } from 'react';
import classes from './SingleItem.module.css';

export default class SingleItem extends Component {

    count = () => {
        return this.props.item.count > 0;
    }

    render() {
        const { id, title, img, price, total, count, company } = this.props.item;
        const {addToCart, increment, decrement} = this.props;
        
    return (
      <div className={classes.row}>
        <div className={classes.column}>
          <div className={classes.card}>
            <span className={classes.imgcontainer}></span>
            <img
              className={classes.img}
              src={img}
              style={{ width: "10rem", heigth: "10rem"}}
              alt="Image Not Loaded"
            />
            <div className={classes.company}>{company}</div>
              <div className={classes.title}>{title}</div>
              {/* <div>
                {info}
              </div> */}
              <div className={classes.price}>
                <strong>
                  <span>MRP Rs.{price}</span> 
                </strong>
              </div>
              <div className={classes.total}>
                <strong>Item total : Rs.{total} </strong>
              </div>
              <div>
              <span><button onClick={() => {
                  return addToCart(id);
                }} disabled={this.count()} 
                className={classes.btnCart}>
                ADD CART
              </button></span>

              <span><button onClick={() => {
                  return increment(id);
                }} disabled={!this.count()}
                className={classes.btnCount}>
                +
              </button></span>
              
              <span className={classes.count}>{count}</span>

              <span><button onClick={() => {
                  return decrement(id);
                }} disabled={!this.count()}
                className={classes.btnCount}>
                -
              </button></span>
              
              
            </div>
          </div>
        </div>                        
      </div>
    );
    }
}