import React , { Component } from 'react';
import axios from '../../axios-order';
import classes from './Address.css';
class Address extends Component {
    state = {
        addresses: []
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
        axios.get(`/users/${this.props.username}/addresses`).then( resp => {
            console.log(resp);
            this.setState({addresses: resp.data});
        }).catch( error => console.log(error));
    }
    addressClickedHandler = (id) => {
        console.log(id);
    }
    render() {
        const address = this.state.addresses.map( address => {
            return (
                <div onClick={ () => this.addressClickedHandler(address.id)} className={classes.Address}>
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
            <div>
                <p>Please select address</p>
                {address}
            </div>
        );
    }
}

export default Address;