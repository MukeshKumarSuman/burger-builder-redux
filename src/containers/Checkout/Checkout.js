import React , { Component } from 'react';
import { Route, Redirect } from 'react-router-dom';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import OrderAddress from '../OrderAddress/OrderAddress';
import { connect } from 'react-redux';
import * as actionCreator from '../../store/actions';

class Checkout extends Component {

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/order-address');
    }
    render() {
        let summary = <Redirect to="/" />
        if (this.props.ingredients) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null
            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary 
                        ingredients={this.props.ingredients}
                        checkoutCancelled={this.checkoutCancelledHandler}
                        checkoutContinued={this.checkoutContinuedHandler}/>
                    <Route path={this.props.match.path + '/order-address'} component={OrderAddress}/>
                </div>
            )
        }
        return summary;
    }
}
const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.order ? state.burgerBuilder.order.ingredients : null,
        purchased: state.order.purchased
    }
}
export default connect(mapStateToProps)(Checkout);