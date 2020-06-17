import React, { Component } from 'react';
import classes from './CheckOut.module.css'

export default class CheckOut extends Component {
    render() {
        const { cartSubTotal, cartTax, cartTotal, openModal } = this.props;
        return (
            <footer className={classes.footer}>
                <div className={classes.cartsubTotal}> Subtotal: Rs. <strong>{cartSubTotal}</strong></div>
                <div className={classes.cartTax}> Tax: Rs. <strong>{cartTax}</strong></div>
                <div className={classes.cartTotal}> Total: Rs. <strong>{cartTotal}</strong></div>
                <button onClick={openModal}
                className={classes.checkOutbtn}
                >CheckOut</button>
            </footer>
        )
    }
}
