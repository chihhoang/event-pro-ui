import { createStore} from "redux";
import cartReducer from "./cartReducer";

const KEY = 'redux-state'

function saveToLocalStore(state) {
    try {
        const blob = JSON.stringify(state)
        localStorage.setItem(KEY, blob)
    } catch(e) {
        console.log(e)
    }
}

function loadFromLocalStore() {
    try {
        const blob = localStorage.getItem(KEY)
        if (blob === null) return undefined
        return JSON.parse(blob)
    } catch(e) {
        console.log(e)
        return undefined
    }
}

const persistedStore = loadFromLocalStore()

const store = createStore(cartReducer, persistedStore, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

store.subscribe(() => {saveToLocalStore(store.getState())})

export default store