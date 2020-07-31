import React ,{Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

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
        ingredients:null,
        totalPrice:4,
        purchasable:false,
        purchasing:false,
        loading:false,
    }

    componentDidMount(){
        axios.get("https://react-my-burger-b3266.firebaseio.com/ingredients.json")
        .then(response=>{
            this.setState({ingredients:response.data});

        });
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
        this.setState({loading:true});
        //alert('You continue');
        //calculate the price at the backend as price can be manipulated at the front end
        const order={
            ingredients:this.state.ingredients,
            price:this.state.totalPrice,
            customer:{
                name:'Tarun',
                address:{
                    street:'jatt',
                    zipcode:'sdsf',
                    country:'india'
                },
                email:'test@test.com',

            },
            deliveryMethod:'fastest',

        }
        
        axios.post('/orders.json',order).then((response)=>{
            console.log(response);
            this.setState({loading:false,purchasing:false});
        }).catch(error=>{
            this.setState({loading:false,purchasing:false});
            console.log(error);
        });

    }

    render(){
        const disabledInfo={
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key]=disabledInfo[key]<=0
        }
        let orderSummary=null;


        
        
        let burger=(<Spinner></Spinner>)

        if(this.state.ingredients){
        burger=(<Aux>
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

            orderSummary=<OrderSummary 
            price={this.state.totalPrice}
            purchaseCancelled={this.purchaseCancelHandler}
            purchaseContinued={this.purchaseContinueHandler}
            ingredients={this.state.ingredients}/>

        }

        if(this.state.loading){
            orderSummary=<Spinner/>
        }



        
        
        return(
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }


}

export default withErrorHandler(BurgerBuilder,axios);