import React , { Component } from 'react';
import { Route } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import OrderAddress from '../OrderAddress/OrderAddress';
class Checkout extends Component {
    state = {
        orderId: null,
        ingredients : null,
        totalPrice: 0,
        username: null
    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price;
        let username;
        let orderId;
        for (let param of query.entries()) {
            if(param[0] === 'price') {
                price = +param[1]
            } else if (param[0] === 'username') {
                username = param[1]
            } else if (param[0] === 'orderId') {
                orderId = param[1]
            } else {
                ingredients[param[0]] = +param[1];
            }
        }
        this.setState({ingredients, totalPrice: price, username, orderId});
    }
    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/order-address');
    }
    render() {
        return(
            <div>
                <CheckoutSummary 
                    ingredients={this.state.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route path={this.props.match.path + '/order-address'} render={(props) => (
                        <OrderAddress ingredients={this.state.ingredients} price={this.state.totalPrice} username={this.state.username} orderId={this.state.orderId} {...props}/>
                    )}/>
            </div>
        );
    }
}
export default Checkout;