import React from 'react';
import classes from './Backdrop.module.css';
const backdrop=(props)=>{

    return (
        props.show?<div className={classes.BackDrop} onClick={props.clicked}></div>:null
    )

};


export default backdrop;
