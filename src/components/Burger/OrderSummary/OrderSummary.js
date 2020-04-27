import React from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummary = props => {
    const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
        if (igKey === 'id') {
            return null;
        }
        return <li key={igKey}><span style={{textTransform: 'capitalize'}}>{igKey}</span>: {props.ingredients[igKey]}</li>;
    });
    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p><strong>Total Price: {props.price}</strong></p>
            <p>Continue to Checkout?</p>
            <Button clicked={props.purchaseCancelled} btnType='Danger'>CANCLE</Button>
            <Button  btnType='Success' clicked={props.purchaseContinued}>CONTINUE</Button>
        </Aux>
    );
};

export default orderSummary;