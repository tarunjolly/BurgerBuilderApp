import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems'; 
import classes from './SideDrawer.module.css';
import BackDrop from '../../UI/BackDrop/BackDrop';
import Aux from '../../../hoc/Aux/Aux';
const sideDrawer=(props)=>{
    //...
    let attachedClasses=[classes.SideDrawer,classes.close];
    if(props.open){
        attachedClasses=[classes.SideDrawer,classes.open];
    }
    return(
        <Aux>
        <BackDrop show={props.open} clicked={props.closed}/>
        <div className={attachedClasses.join(' ')}>
            {/* <Logo height="11%"/> */}
            {/* or */}
            <div className={classes.Logo}>
                <Logo></Logo>
            </div>
            <nav>
                <NavigationItems/>
            </nav>

        </div>
        </Aux>
    );
}

export default sideDrawer