import React from 'react';
import classes from './OrderAddress.css';
import { Route } from 'react-router-dom';
import ContactData from '../ContactData/ContactData';
import Address from '../Address/Address';


class OrderAddress extends React.Component {
    state = {
        address: [],
        addressType: {
            value: '',
            options: ['Exixting Contact', 'New Contact']
        }
    }

    onChnageRadioButtonHandler = (event) => {
        const addressType = event.target.value;
        this.setState({addressType: {...this.state.addressType, value: addressType}});
        if (addressType === 'New Contact') {
            console.log(this.props.match.path);
            this.props.history.replace(`${this.props.match.path}/contact-data`);
        } else {
            console.log(this.props.match.path);
            this.props.history.replace(`${this.props.match.path}/address`);
        }
       
    }

    render () {
        const addressType = this.state.addressType.value;
        const addressChooser = this.state.addressType.options.map( option => {
            const checked = addressType === option;
            return (
                <div key={option} className={classes.Radio}>
                    <input type="radio" checked={checked} id={option} name={option} value={option} onChange={this.onChnageRadioButtonHandler}/>
                    <label htmlFor={option}>{option}</label>
                </div>
            );
        });
        return (
            <div className={classes.OrderAddress}>
                {addressChooser}
                <Route path={this.props.match.path + '/contact-data'} component={ContactData}/>
                <Route path={this.props.match.path + '/address'} component={Address}/>
            </div>
        ); 
    }
}
export default OrderAddress;