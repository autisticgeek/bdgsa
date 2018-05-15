import axios from "axios";
const salesAxios = axios.create();
salesAxios.interceptors.request.use(config =>{
    const token = localStorage.getItem("token")
    config.headers.Authorization=`Bearer ${token}`;
    return config
})
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
                    if (action.sales._id === action._id) {
                        return action.sales;
                    } else {
                        return action.sales;
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
                    currentSales: state.currentSales.filter(card => action.sales._id !== action._id),
                    loading: false,
                    errMsg: action.errMsg
                }
        default :
        return state
            }
    }

    const authUserApi = "/authUser/"

    export const getCurrentSales = (saleId) => {
        return dispatch => {
            salesAxios.get("/api/authUser")
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
            salesAxios.get(authUserApi)
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
            salesAxios.post(authUserApi)
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
            salesAxios.delete(authUserApi + deleteID)
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

    export default authUserReducer;