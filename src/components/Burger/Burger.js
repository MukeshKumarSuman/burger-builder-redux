import React from 'react';
import BurgerIngrdient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.css'

const burger = (props) => {
    const ingredients = {};
    for (let key in props.ingredients) {
        if (key !== 'id') {
            ingredients[key] =  props.ingredients[key];
        }
    }
    let transformedIngredients = Object.keys(ingredients).map(igKey => {
        return [...Array(ingredients[igKey])].map( (_, i) => {
            return <BurgerIngrdient key={igKey + i} type={igKey} />
        });
    }).reduce( (arr, el) =>{
        return arr.concat(el);
    }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients</p>;
    }
    return(
        <div className={classes.Burger}>
            <BurgerIngrdient type='bread-top' />
            {transformedIngredients}
            <BurgerIngrdient type='bread-bottom' />
        </div>
    );
}

export default burger;