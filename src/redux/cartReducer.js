import {ADD_TO_CART, REMOVE_EVENT_FROM_CART, REDUCE_NUM_TICKETS, ADD_NUM_TICKETS, CHECKOUT_DONE} from "./cartConstants";

const initialState = {
    events : [],
    total : 0
}

const cartReducer = (state = initialState, action ) => {
    console.log("reducer in action : " + state.events)
    switch (action.type) {
        case CHECKOUT_DONE:
            console.log("checkout submitted")
            return {
                events : [],
                total : 0
            }
            break;

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
        case ADD_NUM_TICKETS:
            console.log("Case : ADD_NUM-TICKETS");
            let currentEvent = state.events.find((event => action.payload.id === event.id));
            if (currentEvent) {
                return {
                    ...state,
                    events: state.events.map((event, index) => {
                        if (event.id === action.payload.id) {
                            console.log("payload matches")
                            event.numTickets = event.numTickets + 1
                        }
                        return {
                            ...event
                        }
                    }),
                    total: state.total + currentEvent.ticketPrice  }
            }
            break;
        case REDUCE_NUM_TICKETS:
            console.log("Case : REDUCE_NUM_TICKETS");
            let prevEvent = state.events.find((event => action.payload.id === event.id));
            if (prevEvent) {
                return {
                    ...state,
                    events: state.events.map((event, index) => {
                        if (event.id === action.payload.id) {
                            console.log("payload matches")
                            event.numTickets = event.numTickets -1
                        }
                        return {
                            ...event
                        }
                    }).filter(event => {
                        console.log("event" + event.numTickets)
                         return event.numTickets > 0}),
                    total: state.total - prevEvent.ticketPrice < 0 ? 0 : state.total - prevEvent.ticketPrice
            }
            }
            break;

        default: return state
    }
}

export default cartReducer