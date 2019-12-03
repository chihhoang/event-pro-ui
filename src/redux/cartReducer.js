import {ADD_TO_CART} from "./cartConstants";

const initialState = {
    events : [],
    total : 0
}

const cartReducer = (state = initialState, action ) => {
    console.log("reducer in action : " + state.events)
    switch (action.type) {
        case ADD_TO_CART:
            let existingEvent = state.events.find((event => action.payload.id === event.id))
            if (existingEvent) {
                console.log("Updating old event")
                return  {
                    ...state,
                    events: state.events.map((event,index) => {
                        if (event.id === action.payload.id) {
                            console.log("payload matches");
                            event.numTickets = event.numTickets + action.payload.numTickets
                            return event
                        }
                        return {
                            ...event
                        }
                    }),
                    total: state.total + (existingEvent.ticketPrice * action.payload.numTickets)

                }
            } else {
                console.log("Adding new event")
                return  {
                    ...state,
                    events: [...state.events, action.payload],
                    total: state.total + (action.payload.ticketPrice * action.payload.numTickets)

                }
            }
            break;
        default: return state
    }
}

export default cartReducer