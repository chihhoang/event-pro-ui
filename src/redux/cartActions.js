import {
    ADD_TO_CART,
    ADD_NUM_TICKETS,
    REDUCE_NUM_TICKETS,
    REMOVE_EVENT_FROM_CART,
    CHECKOUT_DONE,
    LOGOUT
} from "./cartConstants";

export const addToCart = (event) => {
    console.log("Action received : Add to card with payload " + event)
    return {
        type : ADD_TO_CART,
        payload: event
    }
}

export const removeEventFromCart = (event) =>{
    return{
        type: REMOVE_EVENT_FROM_CART,
        payload: event
    }
}

export const reduceNumTickets= (event) =>{
    return{
        type: REDUCE_NUM_TICKETS,
        payload: event
    }
}

export const addNumTickets = (event) =>{
    return{
        type: ADD_NUM_TICKETS,
        payload: event
    }
}

export const checkoutComplete = () =>{
    return{
        type: CHECKOUT_DONE,
    }
}

export const logOut = () =>{
    return{
        type: LOGOUT,
    }
}