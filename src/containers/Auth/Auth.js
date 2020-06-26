import React from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actionCreator from '../../store/actions';

class Auth extends React.Component {
    state = {
        controls: {
            username: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'username'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false   
    }


    onChangedHandler = (event, inputIdentifier ) => {
        const updatedControls = {...this.state.controls};
        const updatedControlElement = {...updatedControls[inputIdentifier]};
        updatedControlElement.value = event.target.value;
        updatedControlElement.valid = this.checkValidity(updatedControlElement.value, updatedControlElement.validation);
        updatedControlElement.touched = true;
        updatedControls[inputIdentifier] = updatedControlElement;
        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }
        this.setState({controls: updatedControls, formIsValid});
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

    authenticate = event => {
        event.preventDefault(); // prevent to relaoding of page
        const authData = {
            username: this.state.controls.username.value,
            password: this.state.controls.password.value
        }
        this.props.authenticate(authData);
    }

    render() {
        const formElementArrays = [];
        for (let key in this.state.controls) {
            formElementArrays.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = (
            <form onSubmit={this.authenticate}>
                {formElementArrays.map( formElement => <Input label={formElement.id} invalid={formElement.config.validation !== undefined ? !formElement.config.valid : false} 
                                                            touched={formElement.config.touched}
                                                            changedHandler={(event) => this.onChangedHandler(event, formElement.id)}
                                                             key={formElement.id} {...formElement.config}/>)}
                <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
            </form>
        );
        return (
            <div className={classes.Auth}> {form}</div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authenticate: (authData) => dispatch(actionCreator.authenticate(authData))
    }
}
export default connect(null, mapDispatchToProps)(Auth);