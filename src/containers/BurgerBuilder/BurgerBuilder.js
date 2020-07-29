import React ,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENT_PRICES={
    salad:0.5,
    cheese:0.4,
    meat:1.3,
    bacon:0.7,
}

class BurgerBuilder extends Component{
    // constructor(props){
    //     super(props);
    //     this.state={}
    // }

    state={
        ingredients:{
            salad:0,
            bacon:0,
            cheese:0,
            meat:0,
        },
        totalPrice:4,
        purchasable:false,
        purchasing:false,
    }
    purchaseHandler=()=>{
        this.setState({purchasing:true});
    }
    updatePurchaseState(ingredients){
        
        const sum=Object.keys(ingredients)
        .map(igkey=>{
            return ingredients[igkey];
        })
        .reduce((sum,el)=>{
            return sum+el;
        },0);

        this.setState({purchasable:sum>0});


    }

    purchaseCancelHandler=()=>{
        this.setState({purchasing:false});
    }

    addIngredientHandler=(type)=>{
        const oldcount=this.state.ingredients[type];
        const updatedCount=oldcount+1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceAddition=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice+priceAddition;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHnadler=(type)=>{
        const oldcount=this.state.ingredients[type];
        if(oldcount<=0){
            return;
        }
        const updatedCount=oldcount-1;
        const updatedIngredients={
            ...this.state.ingredients
        };
        updatedIngredients[type]=updatedCount;
        const priceDeduction=INGREDIENT_PRICES[type];
        const oldPrice=this.state.totalPrice;
        const newPrice=oldPrice-priceDeduction;
        this.setState({totalPrice:newPrice,ingredients:updatedIngredients});
        this.updatePurchaseState(updatedIngredients);

    }

    purchaseContinueHandler=()=>{
        alert('You continue');
    }

    render(){
        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    ingredients={this.state.ingredients}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}></Burger>
                <BuildControls 
                ordered={this.purchaseHandler}
                purchasable={this.state.purchasable}
                price={this.state.totalPrice}
                disabled={disabledInfo}
                ingredientsAdded={this.addIngredientHandler}
                    ingredientsRemoved={this.removeIngredientHnadler}
                ></BuildControls>
            </Aux>
        );
    }


}

export default BurgerBuilder;