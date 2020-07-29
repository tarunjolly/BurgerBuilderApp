import React from 'react';
import classes from './burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';


const burger=(props)=>{
    let transformedIngredients=Object.keys(props.ingredients)
    .map(igkey=>{
        return [...Array(props.ingredients[igkey])].map((_,i)=>{
            return <BurgerIngredient key={igkey+i} type={igkey}/>
            //[]of two elements
    });
    })
    .reduce((arr,el)=>{
        return arr.concat(el);
    },[]);

    if(transformedIngredients.length===0){
        transformedIngredients=<p>Please Start Adding ingredients</p>
    }
    //console.log(transformedIngredients);

    return(
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"></BurgerIngredient>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"></BurgerIngredient>
        </div>
    );
};

export default burger;