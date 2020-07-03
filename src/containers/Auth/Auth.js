import React from 'react';
import { connect } from 'react-redux';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actionCreator from '../../store/actions';
import Spinner from '../../components/UI/Spinner/Spinner';
import { Redirect } from 'react-router-dom';

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

    componentDidMount() {
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.setAuthRedirectPath('/');
        } else {
            this.props.setRegistrationRedirectPath("/checkout");
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

    authenticate = event => {
        event.preventDefault(); // prevent to relaoding of page
        const authData = {
            username: this.state.controls.username.value,
            password: this.state.controls.password.value
        }
        this.props.authenticate(authData);
    }

    redirectToRegistration = (event) => {
        event.preventDefault();
        this.props.history.push('/register');
    }
    render() {
        const formElementArrays = [];
        for (let key in this.state.controls) {
            formElementArrays.push({
                id: key,
                config: this.state.controls[key]
            });
        }
        let form  = <Spinner />;
        if (!this.props.loading) {
            form = (
                <form onSubmit={this.authenticate}>
                    {formElementArrays.map( formElement => <Input label={formElement.id} invalid={formElement.config.validation !== undefined ? !formElement.config.valid : false} 
                                                                touched={formElement.config.touched}
                                                                changedHandler={(event) => this.onChangedHandler(event, formElement.id)}
                                                                 key={formElement.id} {...formElement.config}/>)}
                    <Button btnType="Success" disabled={!this.state.formIsValid}>SUBMIT</Button>
                </form>
            );
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = (
                <>
                    <p className={classes.Error}><strong>{this.state.controls.username.value}</strong> {this.props.error.response.data.message}</p>
                    <p>Please, click <strong className={classes.Registration} onClick={this.redirectToRegistration}>here...</strong> to start your registration</p>
                </>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath} />
        }
        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                {form}
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.username != null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}
const mapDispatchToProps = dispatch => {
    return {
        authenticate: (authData) => dispatch(actionCreator.authenticate(authData)),
        setAuthRedirectPath: (path) => dispatch(actionCreator.setAuthRedirectPath(path)),
        setRegistrationRedirectPath: (path) => dispatch(actionCreator.setRegistrationRedirectPath(path))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Auth);