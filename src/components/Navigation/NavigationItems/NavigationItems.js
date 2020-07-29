import React from 'react';
import classes from './navigationitems.module.css';
import NavigationItem from '../NavigationItems/navitem/navitem';
const navigationItems=(props)=>{
    return (
        <ul className={classes.NavigationItems}>
            <NavigationItem link='/' active> BurgerBuilder </NavigationItem>
            <NavigationItem link='/'> CheckOut </NavigationItem>
        </ul>

    )
}


export default navigationItems;