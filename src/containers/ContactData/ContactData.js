import React, { Component } from "react";
import axios from '../../axios-order';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import classes from './ContactData.css';
import Input from '../../components/UI/Input/Input';
class ContactData extends Component {

    state = {
        orderForm: {
            fullName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Full Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            streetAddress: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: '/Flat/House No./Floor/Building/colony/street/locality'
                },
                value: '',
                valid: true
            },
            landmark: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Landmark'
                },
                value: '',
                valid: true
            },
            city: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your City'
                },
                value: '',
                valid: true
            },
            state: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your State'
                },
                value: '',
                valid: true
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                valid: true
            },
            contactNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Contact Number'
                },
                value: '',
                valid: true
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            addressType: {
                elementType: 'select',
                elementConfig: {
                    options:  [
                        {value: 'Home', displayValue: 'Home'},
                        {value: 'Office', displayValue: 'Office'}
                    ],
                    placeholder: 'Select Address Type'
                },
                value: 'Home',
                valid: true
            },
            defaultAddress: {
                elementType: 'select',
                elementConfig: {
                    options:  [
                        {value: true, displayValue: 'True'},
                        {value: false, displayValue: 'False'}
                    ],
                    placeholder: 'Default Delivery Address'
                },
                value: true,
                valid: true
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options:  [
                        {value: 'fastest', displayValue: 'Fastest'},
                        {value: 'cheapest', displayValue: 'Cheapest'}
                    ],
                    placeholder: 'Select Delivery Option'
                },
                value: 'fastest',
                valid: true
            },
            quantity: {
                elementType: 'input',
                elementConfig: {
                    type: 'number',
                    placeholder: 'Quantity'
                },
                value: 1,
                valid: true
            },
        },
        loading: false,
        formIsValid: false
    }
    onChangedHandler = (event, inputIdentifier ) => {
        const updatedOrdeForm = {...this.state.orderForm};
        const updatedFormElement = {...updatedOrdeForm[inputIdentifier]};
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
        updatedFormElement.touched = true;
        updatedOrdeForm[inputIdentifier] = updatedFormElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedOrdeForm) {
            formIsValid = updatedOrdeForm[inputIdentifier].valid && formIsValid;
        }
        this.setState({orderForm: updatedOrdeForm, formIsValid});
    }
    checkValidity(value, rule) {
        if (!rule) {
            return true;
        }
         let isValid = true;
        if (rule.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rule.minLength) {
            isValid = value.length >= rule.minLength && isValid;
        }

        if (rule.maxLength) {
            isValid = value.length <= rule.maxLength && isValid;
        }
        return isValid;
    }
    orderHandler = (event) => {
        event.preventDefault();
        console.log(this.props);
        this.setState({loading: true});
        const order = {};
        const address = {};
        for (let key in this.state.orderForm) {
            if (key === 'deliveryMethod' || key === 'quantity') {
                order[key] =  this.state.orderForm[key].value;
            } else {
                address[key] =  this.state.orderForm[key].value;
            }
        }
        /*
        "order": {
                "id": '',
                "totalPrice": 0,
                "deliveryMethod": "",
                "quantity": 2,
                "ingredients": {
                    "id": '',
                    "salad": 0,
                    "bacon": 0,
                    "cheese": 0,
                    "meat": 0
                }
            }
        const order = {
            "deliveryMethod": "fast",
            ingredients: this.props.ingredients
       }
        */
       order.ingredients = this.props.ingredients;
       order.address = address;
        axios.put(`/users/${this.props.username}/orders/${this.props.orderId}`, order)
        .then( response => {
            this.setState({loading: false});
            this.props.history.push('/');
        })
        .catch( error => {
            console.log(error);
            this.setState({loading: false});
        });
    }
    
    render() {
        const formElementArrays = [];
        for (let key in this.state.orderForm) {
            formElementArrays.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArrays.map( formElement => <Input label={formElement.id} invalid={formElement.config.validation !== undefined ? !formElement.config.valid : false} 
                                                            touched={formElement.config.touched}
                                                            changedHandler={(event) => this.onChangedHandler(event, formElement.id)}
                                                             key={formElement.id} {...formElement.config}/>)}
                <Button btnType="Success" disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );
        if (this.state.loading) {
            form = <Spinner />
        }
        return (
            <> {form}</>
        );
    }
}
export default ContactData;