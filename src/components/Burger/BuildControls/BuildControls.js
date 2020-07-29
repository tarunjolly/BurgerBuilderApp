import React from 'react';
import classes from './buildcontrols.module.css';
import BuildControl from './Buildcon/BuildControl';
const controls=[
    {label:'Salad',type:'salad'},
    {label:'Bacon',type:'bacon'},
    {label:'Cheese',type:'cheese'},
    {label:'Meat',type:'meat'},
];

const buildControls=(props)=>{

    return(<div className={classes.BuildControls}>
        <p>Current Price:<strong>{props.price.toFixed(2)}</strong></p>
        {controls.map(ctrl=>(
             <BuildControl 
             disabled={props.disabled[ctrl.type]}
             remove={()=>props.ingredientsRemoved(ctrl.type)}
             added={()=>props.ingredientsAdded(ctrl.type)}
             key={ctrl.label} label={ctrl.label}></BuildControl>)
        )}

        <button 
        onClick={props.ordered}
        disabled={!props.purchasable}
        className={classes.OrderButton}>Order Now</button>
    </div>
    );
}

export default buildControls;