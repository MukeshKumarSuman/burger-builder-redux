import React, {Component} from 'react';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';



const INGREDIENT_PRICES = {
    salad: 10,
    meat: 10,
    cheese: 10,
    bacon: 10
}
class BurgerBuilder extends Component {
    /*
    // this state we will used initially now as we can featch data from firebase so we can featch ingredients from there
    1st add  ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        } in firebase

    state = {
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false
    }
    state = {
        customer : {
            "id": 51,
            "username": "radhe1",
            "name": {
                "firstName": "Mukesh",
                "middleName": "Kumar",
                "lastName": "Suman"
            },
            "address": {
                "addressLine1": "SDO Road",
                "addressLine2": "NorthANderkila",
                "city": "Hajipur",
                "state": "Bihar",
                "country": "India",
                "zipCode": "844101"
            },
            "order": {
                "id": 52,
                "totalPrice": 0,
                "deliveryMethod": "fast",
                "ingredients": {
                    "id": 53,
                    "salad": 0,
                    "bacon": 0,
                    "cheese": 0,
                    "meat": 0
                },
                "price": 0
            }
        }
    }
    */
    state = {
        customer : {
            "id": '',
            "username": "",
            "name": {
                "firstName": "",
                "middleName": "",
                "lastName": ""
            },
            "address": {
                "addressLine1": "",
                "addressLine2": "",
                "city": "",
                "state": "",
                "country": "",
                "zipCode": ""
            },
            "order": {
                "id": '',
                "totalPrice": 0,
                "deliveryMethod": "",
                "ingredients": {
                    "id": '',
                    "salad": 0,
                    "bacon": 0,
                    "cheese": 0,
                    "meat": 0
                }
            }
        },
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount() {
        axios.get('users/mukesh')
        .then( response => {
            this.setState( (state, props) => {
                const order = response.data.orders[0];
                const customer = {...response.data, order}
                return {customer:customer, purchasable: this.ispurchasable({...order.ingredients}) };
            });
            console.log(response);
        }).catch( error => {
            this.setState({error: true});
        });
    }
    updatePurchaseState (ingredients) {
        this.setState({purchasable: this.ispurchasable(ingredients)});
    }

    ispurchasable (ingredients) {
        const copiedIngredients = {...ingredients};
        delete copiedIngredients.id;
        const sum = Object.keys(copiedIngredients).map( igKey => {
            return copiedIngredients[igKey];
        }).reduce((sum, el) => {
            return sum + el;
        }, 0);
        return sum > 0;
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.customer.order.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.customer.order.ingredients};
        updatedIngredients[type] = updatedCount;

        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.customer.order.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({customer: {...this.state.customer, order : {...this.state.customer.order, totalPrice: newPrice, ingredients: updatedIngredients}}});
        //this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.customer.order.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.customer.order.ingredients};
        updatedIngredients[type] = updatedCount;

        const priceDeduction = INGREDIENT_PRICES[type];
        const oldPrice = this.state.customer.order.totalPrice;
        const newPrice = oldPrice - priceDeduction;

        this.setState({customer: {...this.state.customer, order : {...this.state.customer.order, totalPrice: newPrice, ingredients: updatedIngredients}}});
        //this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancleHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
        /*
        this.setState({loading: true});
        axios.post('/save', this.state.customer)
        .then( response => {
            console.log(response);
            this.setState({loading: false, purchasing: false});
        })
        .catch( error => {
            console.log(error);
            this.setState({loading: false, purchasing: false});
        });
        */
       const queryParams = [];
       for (let key in this.state.customer.order.ingredients) {
            queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(this.state.customer.order.ingredients[key]));
       }
       queryParams.push('orderId=' + this.state.customer.order.id);
       queryParams.push('price=' + this.state.customer.order.totalPrice);
       queryParams.push('username=' + this.state.customer.username);
       const querySring = queryParams.join('&');
       this.props.history.push({
           pathname: '/checkout',
           search: '?' + querySring
       });
    }

    render() {
        const ingredients = this.state.customer.order.ingredients;
        const disabledInfo = {...ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] =  disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.state.error ? <p>Ingredients can not be loaded</p> : <Spinner />
        if (ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler} 
                        disabled={disabledInfo}
                        price={this.state.customer.order.totalPrice}
                        prchable={this.state.purchasable}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );

            orderSummary = <OrderSummary ingredients={ingredients}
                 purchaseCancelled={this.purchaseCancleHandler}
                 purchaseContinued={this.purchaseContinueHandler}
                 price={this.state.customer.order.totalPrice}/>;
        }

        if ( this.state.loading) {
            orderSummary = <Spinner />;
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancleHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}
export default withErrorHandler(BurgerBuilder, axios);
