import React from 'react';
import classes from './Logo.module.css';
import burgerLogo from '../../assests/images/burger-logo.png';
const logo=(props)=>{
    return (
        <div className={classes.Logo} style={{height:props.height}}>
        <img src={burgerLogo} alt="MyBurger"></img>
        </div>
    );
}


export default logo;