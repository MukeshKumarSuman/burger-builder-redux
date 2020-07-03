import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actionCreator from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {
    state = {
        orders: [
            {
                "id": 1,
                "totalPrice": 120,
                "deliveryMethod": "fast",
                "ingredients": {
                    "id": 1,
                    "salad": 3,
                    "bacon": 3,
                    "cheese": 3,
                    "meat": 3
                }
            },
            {
                "id": 2,
                "totalPrice": 80,
                "deliveryMethod": "slow",
                "ingredients": {
                    "id": 2,
                    "salad": 2,
                    "bacon": 2,
                    "cheese": 2,
                    "meat": 2
                }
            }
        ]
    }

    componentDidMount() {
        this.props.onFetchOrders(this.props.username);
    }

    deleteOrder = (id) => {
        this.props.deleteOrder(id);
    }

    render() {
        let orders = <Spinner />
        if (!this.props.loading) {
            orders = this.props.orders.map(order => {
                return <Order key={order.id} deleteOrder={() => this.deleteOrder(order.id)} {...order} {...order.ingredients}/>
            });
        }
        const burgerBuilderRedirect = this.props.username ? null : <Redirect to="?" />
        return (
            <>
                {burgerBuilderRedirect}
               {orders}
            </>
        );
    }
}

const mapStateToProps = state => {
    return {
        username: state.auth.username,
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (username) => dispatch(actionCreator.fetchOrders(username)),
        deleteOrder: (id) => dispatch(actionCreator.deleteOrder(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));