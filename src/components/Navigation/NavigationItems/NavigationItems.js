import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

const navigationItems = props => (
    <ul className={classes.NavigationItems}>
        <NavigationItem link='/' exact>Burger Builder</NavigationItem>
        { props.isAuthenticated
            ? <>
                <NavigationItem link='/logout'>Logout</NavigationItem>
                <NavigationItem link='/orders'>Orders</NavigationItem>
              </>
            : <>
                <NavigationItem link='/auth'>Authenticate</NavigationItem>
                <NavigationItem link='/register'>User Registration</NavigationItem>
              </>
        }
    </ul>
);

export default navigationItems;