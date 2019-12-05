import React, { Component } from 'react';
import { connect } from 'react-redux'
import {addNumTickets, checkoutComplete, logOut, reduceNumTickets, removeEventFromCart} from "../redux/cartActions";
import MaterialIcon, {colorPalette} from 'material-icons-react';
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom";
import store from "../redux/store";
import * as CheckoutService from "../services/CheckoutService";
import * as EventService from "../services/EventService";

class Cart extends Component{

    removeEventFromCart = (event)=>{
        this.props.removeEventFromCart(event);
    }

    addNumTickets = (event)=>{
        this.props.addNumTickets(event);
    }

    reduceNumTickets = (event)=>{
        this.props.reduceNumTickets(event);
    }

    checkoutComplete = async () => {

        let checkoutData = store.getState()
        console.log("checkout Data before ")

        console.log(checkoutData)
        let orderData;
        if (checkoutData.events !== null && checkoutData.events.length > 0) {
            orderData = checkoutData.events.map((event => {
                    return {
                    quantity: event.numTickets,
                    price: event.ticketPrice,
                    purchased: true,
                    eventId: event.id
                }
            }));

            let formData = {
                orderItemList : orderData,
                totalCost : checkoutData.total
            }

            CheckoutService.checkout(formData)
                .then(response => {
                    console.log("data received :" + response);
                    this.props.checkoutComplete();
                    alert("Booking Complete. Please show your booking reference number and pay at the counter to collect your ticket. Kindly refer to the Booking Reference number in the booking history " )
                    window.location = "/";
                })
                .error(err => {
                    alert("Booking Failed ")
                    window.location = "/";
                })
        }



    }

    logOut = ()=>{
        this.props.logOut();
    }






    render(){
        console.log(" Cart Render !!!")
        const token = localStorage.getItem("idToken");
        if (!token) {
            return (<div> Please login to use Cart Functionality !!!!!</div>);
        }
        let addedItems = this.props.events != null && this.props.events.length ?
            (
                this.props.events.map(event=>{
                    return(
                        <li className="collection-item avatar" key={event.id}>
                            <div className="item-img">
                                <img src={event.imageUrl} alt={event.imageUrl} />
                            </div>

                            <div className="item-desc">
                                <span className="title">{event.description}</span>
                                <p><b>  Price: $ {event.ticketPrice}</b></p>
                                <p><b>  Quantity: {event.numTickets}</b>
                                </p>
                                <div className="add-remove">
                                    <MaterialIcon icon="add_circle" size='large' onClick={()=>{this.addNumTickets(event)}} />
                                    <MaterialIcon icon="remove_circle" size='large' onClick={()=>{this.reduceNumTickets(event)}} />
                                </div>
                                {/*<button className="waves-effect waves-light btn pink remove" onClick={()=>{this.handleRemove(event.id)}}>Remove</button>*/}
                            </div>

                        </li>


                    )
                })
            ) : (<h2 className="collection-item avatar" >Cart Empty !!!!</h2>)
        return(
            <div className="container">
                <div className="cart">
                    <h1>Order Summary : </h1>
                    <ul className="collection">
                        {addedItems}
                    </ul>
                    <h1> Total : {this.props.total} </h1>
                    <Button variant="contained" color="primary" onClick={()=>{this.checkoutComplete()}} >
                        CHECKOUT
                    </Button>
                </div>
            </div>
        )
    }
}


const mapStateToProps = (state) => {
    return{
        events: state.events,
        total : state.total
    }
}

const mapDispatchToProps = (dispatch)=>{

    return{
        removeEventFromCart: (event)=>{dispatch(removeEventFromCart(event))},
        addNumTickets: (event)=>{dispatch(addNumTickets(event))},
        reduceNumTickets: (event)=>{dispatch(reduceNumTickets(event))},
        checkoutComplete: ()=>{dispatch(checkoutComplete())},
        logOut: ()=>{dispatch(logOut())}
    }

}

export default connect(mapStateToProps,mapDispatchToProps)(Cart)
