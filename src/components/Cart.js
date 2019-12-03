import React, { Component } from 'react';
import { connect } from 'react-redux'
import {addNumTickets, checkoutComplete, logOut, reduceNumTickets, removeEventFromCart} from "../redux/cartActions";
import MaterialIcon, {colorPalette} from 'material-icons-react';
import Button from '@material-ui/core/Button';
import {Redirect} from "react-router-dom";
import store from "../redux/store";

class Cart extends Component{
    state = {
        checkoutComplete: false,
    };

    removeEventFromCart = (event)=>{
        this.props.removeEventFromCart(event);
    }

    addNumTickets = (event)=>{
        this.props.addNumTickets(event);
    }

    reduceNumTickets = (event)=>{
        this.props.reduceNumTickets(event);
    }

    checkoutComplete = ()=>{
        let checkoutData = store.getState()
        console.log("checkout Data")
        console.log(checkoutData)
        this.props.checkoutComplete();

        // TODO: ADD Server call or alert here
        this.setState({
            checkoutComplete: true
        });

    }

    logOut = ()=>{
        this.props.logOut();
    }


    render(){
        console.log(" Cart Render !!!")
        if (this.state.checkoutComplete === true ) {
            return <Redirect to='/' />
        }
        let addedItems = this.props.events != null && this.props.events.length > 0 ?
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
                            </div>

                        </li>


                    )
                })
            ) : (<h2 className="collection-item avatar" > Cart Empty !!!!</h2>)
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