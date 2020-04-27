import React, {Component} from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
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
        const username = 'mukesh';
        axios.get(`users/${username}/orders`).then( resp => {
            console.log(resp);
            this.setState({loading: false, orders: resp.data});
        }).catch( error => this.setState({loading: false}));
    }
    render() {
        const orders = this.state.orders.map(order => <Order key={order.id} {...order} {...order.ingredients}/>);
        return (
            <div>
               {orders}
            </div>
        );
    }
}
export default withErrorHandler(Orders, axios);