import React , { Component } from 'react';
import $ from 'jquery';
import { connect } from 'react-redux';
import axios from '../../axios-order';
import classes from './Address.css';
import Button from '../../components/UI/Button/Button';
import * as actionCreator from '../../store/actions';
class Address extends Component {
    state = {
        addressId: null
    }
    /*
    {
        addressType: "Home"
        city: "Bangalore"
        contactNumber: "07542007544"
        country: "India"
        defaultAddress: true
        email: "abc@gmail.com"
        fullName: "Suman"
        id: 3
        landmark: ""
        state: "Karnataka"
        streetAddress: "101B, AECS Layout"
        zipCode: "560068"
    }
    */
    componentDidMount() {
        if (this.props.addresses.length === 0) {
            this.props.getAddress(this.props.username);
        }
    }

    addressClickedHandler = (event, id) => {
        const $prevTarget = $(`.${classes.Selected}`);
        if($prevTarget.length && id != $prevTarget.attr('id')) {
            $prevTarget.removeClass(classes.Selected);
        }
        const $currentTarget = $(event.currentTarget);
        $currentTarget.toggleClass(classes.Selected);
        this.setState({addressId: id === this.state.addressId ? null : id});
    }

    orderHandler = (event) => {
        const order = {};
        order.ingredients = this.props.ingredients;
        delete order.ingredients.id;
        const address = this.props.addresses.filter(address => address.id === this.state.addressId);
        console.log(address);
    }
    render() {
        const address = this.props.addresses.map( address => {
            return (
                <div key={address.id} id={address.id} onClick={ (event) => this.addressClickedHandler(event, address.id)} className={classes.Address}>
                    <p>Name: {address.fullName}</p>
                    <p>Street Address: {address.streetAddress}</p>
                    <p>Landmark: {address.landmark}</p>
                    <p>Contact Number: {address.contactNumber}</p>
                    <p>Email: {address.email}</p>
                    <p>City: {address.city}</p>
                    <p>State: {address.state}</p>
                    <p>Country: {address.country}</p>
                    <p>Zip Code: {address.zipCode}</p>
                </div>
            );
        });
        return (
            <div className={classes.container}>
                {/*<p>Please select address</p>*/}
                {address}
                <Button btnType="Success" disabled={!!!this.state.addressId} clicked={this.orderHandler} >ORDER</Button>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        username: state.auth.username,
        addresses: state.address.address,
        ingredients: state.burgerBuilder.order.ingredients,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getAddress: (username) => dispatch(actionCreator.getAddress(username))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Address);