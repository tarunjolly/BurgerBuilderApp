import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import BackDrop from '../BackDrop/BackDrop';
import classes from './Modal.module.css';
class Modal extends Component{

    shouldComponentUpdate(nextProps,nextState){
        if(nextProps.show!==this.props.show){
            return true;
        }else{
            return false;
        }
    }


    componentDidUpdate(){
        console.log("Model will update");
    }

    render(){
        return (
            <Aux>
                    <BackDrop show={this.props.show} clicked={this.props.modalClosed}></BackDrop>
        
            <div 
                
                className={classes.Modal}
                style={{
                    transform:this.props.show?'translateY(0)':'translateY(-100vh)',
                    opacity:this.props.show? '1':'0'
                }}
                >
                {this.props.children}
            </div>
        
            </Aux>
            )
    }
    

};


export default Modal;