import React from 'react';
import classes from './Order.css';

const order = props => {
    const ingredients = [];
    for (let key in props.ingredients) {
        if (key !== 'id') {
            ingredients.push({nmae: key, count: props.ingredients[key]});
        }
    }

    const ingredientOutput = ingredients.map( ig => <span>{ig.nmae} ({ig.count})</span>);
    return (
            <div className={classes.Order}> 
                <p>Ingrdeeints: {ingredientOutput}</p>
                <p>Delivery Method: <strong>{props.deliveryMethod}</strong></p>
                <p>Price: <strong>INR {Number.parseFloat(props.totalPrice).toFixed(2)}</strong></p>
            </div>
        );
}
export default order;
/*
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
}
*/