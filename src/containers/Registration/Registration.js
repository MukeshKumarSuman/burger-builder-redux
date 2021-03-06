import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Registration.css';
import * as actionCreator from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';

class Registration extends React.Component {
    state = {
        controls: {
            fullName: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
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
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Email'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            contactNumber: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Contact Number'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 11
                },
                valid: false,
                touched: false
            }   
        },
        formIsValid: false   
    }

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.registrationRedirectPath !== '/') {
            this.props.setRegistrationRedirectPath('/');
        }
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

    register = event => {
        event.preventDefault();// orevant from reloading the page
        const userData = {};
        for (let key in this.state.controls) {
            userData[key] =  this.state.controls[key].value;
        }
        this.props.register(userData);
        
    } 

    render() {
        const formElementArrays = [];
        for (let key in this.state.controls) {
            formElementArrays.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form = <Spinner />;
        if (!this.props.loading) {
            form = (
                <form onSubmit={this.register}>
                    {formElementArrays.map( formElement => <Input label={formElement.id} invalid={formElement.config.validation !== undefined ? !formElement.config.valid : false} 
                                                                touched={formElement.config.touched}
                                                                changedHandler={(event) => this.onChangedHandler(event, formElement.id)}
                                                                 key={formElement.id} {...formElement.config}/>)}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
                </form>
            );
        }
        let registrationRedirectPath = null;
        if (this.props.isAuthenticated) {
            registrationRedirectPath = <Redirect to={this.props.registrationRedirectPath} />
        }
        return (
            <div className={classes.Registration}>
                {registrationRedirectPath}
                {form}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.registration.loading,
        buildingBurger: state.burgerBuilder.building,
        registrationRedirectPath: state.registration.registrationRedirectPath,
        isAuthenticated: state.auth.username !== null
    }
}
const mapDispatchToProps = dispatch => {
    return {
        register: (userData) => dispatch(actionCreator.register(userData)),
        setRegistrationRedirectPath: (path) => dispatch(actionCreator.setRegistrationRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Registration);