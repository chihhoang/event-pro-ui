import {
    ADD_TO_CART
} from "./cartConstants";

export const addToCart = (event) => {
    console.log("Action received : Add to card with payload " + event)
    return {
        type : ADD_TO_CART,
        payload: event
    }
}
