import React, {Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../Auxiliary/Auxiliary';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
 import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {
    state = {
        showSidedrawer: false
    }
    sideDrawerClosedHandler = () => {
        this.setState({showSidedrawer: false});
    }

    sideDrawerToggleHandler = () => {
        this.setState( (prevState) => {
            return {showSidedrawer: !prevState.showSidedrawer};
        });
    }
    render () {
        return (
            <Aux>
                {/*<div>Toolbar, SideDrawer, Backdrop</div>*/}
                <Toolbar isAuth={this.props.isAuthenticated} drawerToggleClicked={this.sideDrawerToggleHandler} name={this.props.customerName}/>
                <SideDrawer isAuth={this.props.isAuthenticated} open={this.state.showSidedrawer} closed={this.sideDrawerClosedHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}
const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.username != null,
        customerName: state.auth.customer && state.auth.customer.fullName
    }
}

export default connect(mapStateToProps)(Layout);