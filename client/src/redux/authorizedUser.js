import axios from "axios";
import uuid from "uuid";

const initialState = {
    data: [],
    currentSales: [],
    loading: true,
    errMsg: ""
}

const authUserReducer = (state = initialState, action) =>{
    switch (action.type) {
        case "GET_CURRENT_SALES":
            return {
                ...state,
                data: action.currentSales,
                loading: false,
            }
        case "GET_ONE_SALE":
            return {
                ...state,
                loading: false,
                data: state.data.map(cards => {
                    if (sales._id === action._id) {
                        return action.sales;
                    } else {
                        return sales;
                    }
                })   
            }
        case "POST_SALE":
            return {
                ...state,
                currentSales: [...state.currentSales, action.sale],
                loading: false,
                }
        case "REMOVE_ONE_SALE":
                return {
                    ...state,
                    currentSales: state.currentSales.filter(card => sale._id !== action._id),
                    loading: false,
                    errMsg: action.errMsg
                }
            }
    }

    const authUserApi = "/authUser/"

    export const getCurrentSales = (saleId) => {
        return dispatch => {
            axios.get(authUserApi)
                .then(response => {
                    dispatch({
                        type: "GET_CURRENT_SALES",
                        sales: response.data.data
                    })
                })
                .catch(err => {
                    dispatch({
                        type: "ERR_MSG",
                        errMsg: "You have no current sales."
                    })
                })
        }
    }
    export const getOneSale = ()=> {
        return dispatch => {
            axios.get(authUserApi)
            .then(response => {
                dispatch({
                    type: "GET_ONE_SALE",
                    sales: response.data
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "No sales found"
                })
            })
        }
    }
    export const postSale = ()=>{
        return dispatch =>{
            axios.post(authUserApi)
            .then(response => {
                dispatch({
                    type: "POST_SALE",
                    card: response.data
                })
            })
            .catch(err =>{
                dispatch({
                    type:"ERR_MSG",
                    errMsg: "No sales found"
                })
            })
        }
    }
    export const removeOneSale = (deleteID) => {
        return dispatch => {
            axios.delete(authUserApi + deleteID)
            .then(response =>{
                dispatch({
                    type: "REMOVE_ONE_SALE",
                    id: deleteID
                })
            })
            .catch(err => {
                dispatch({
                    type: "ERR_MSG",
                    errMsg: "No cards found"
                })
            })
        }
    }

    export default salesReducer;