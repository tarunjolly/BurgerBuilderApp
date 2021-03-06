import React, { Component } from 'react';
import Aux from '../Aux'
import classes from './Layout.module.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';
class Layout extends Component {

    state={
        showSideDrawer:false,
    }

    sideDrawerClosedHandler=()=>{
        this.setState({showSideDrawer:false});
    }
    sideDrawerToggleHandler=()=>{
        this.setState((prevstate)=>{return {showSideDrawer:!prevstate.showSideDrawer}});
    }


    render() {



        return (
            <Aux>
                <Toolbar 
                drawerToggleClicked={this.sideDrawerToggleHandler}></Toolbar>
                <SideDrawer open={this.state.showSideDrawer} closed={this.sideDrawerClosedHandler}></SideDrawer>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        )


    }

}


export default Layout;