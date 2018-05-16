import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";

import user from "./auth"
// import regUser from "./regUser"
// import unregUser from "./unregUser"

const reducer = combineReducers({ 
    user
    // regUser,
    // unregUser
});

const store= createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
    applyMiddleware(thunk)
);
store.subscribe(()=> console.log("store",store.getState()))
export default store;