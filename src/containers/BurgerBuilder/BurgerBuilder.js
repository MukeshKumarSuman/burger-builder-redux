import React, {Component} from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import axios from '../../axios-order';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
//import { addIngredient, removeIngredient, initCustomer }  from '../../store/actions';
import * as actionCreator from '../../store/actions';


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
        purchasing: false
    }

    componentDidMount() {
       this.props.initCustomer();
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

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancleHandler = () => {
        this.setState({purchasing: false});
    }

    purchaseContinueHandler = () => {
       this.props.onInitPurchase();
       this.props.history.push('/checkout');
    }

    render() {
        const ingredients = this.props.ingredients;
        const disabledInfo = {...ingredients};
        for (let key in disabledInfo) {
            disabledInfo[key] =  disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can not be loaded</p> : <Spinner />
        if (ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.props.addIngredient} 
                        ingredientRemoved={this.props.removeIngredient} 
                        disabled={disabledInfo}
                        price={this.props.price}
                        prchable={this.ispurchasable(ingredients)}
                        ordered={this.purchaseHandler}/>
                </Aux>
            );

            orderSummary = <OrderSummary ingredients={ingredients}
                 purchaseCancelled={this.purchaseCancleHandler}
                 purchaseContinued={this.purchaseContinueHandler}
                 price={this.props.price}/>;
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

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.customer && state.burgerBuilder.customer.order && state.burgerBuilder.customer.order.ingredients,
        price: state.burgerBuilder.customer && state.burgerBuilder.customer.order && state.burgerBuilder.customer.order.price,
        error: state.burgerBuilder.error
    }
}

//const mapDispatchToProps = { addIngredient, removeIngredient, initCustomer }
const mapDispatchToProps = dispatch => { 
    return {
        addIngredient: (ingredientname) => dispatch(actionCreator.addIngredient(ingredientname)),
        removeIngredient: (ingredientname) => dispatch(actionCreator.removeIngredient(ingredientname)),
        initCustomer: () => dispatch(actionCreator.initCustomer()),
        onInitPurchase: () => dispatch(actionCreator.purchaseInit())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
