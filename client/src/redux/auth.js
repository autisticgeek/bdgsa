import axios from "axios"

const profileAxios = axios.create()
profileAxios.interceptors.request.use(config =>{
    const token = localStorage.getItem("token")
    config.headers.Authorization=`Bearer ${token}`;
    return config
})
const initialState = {
    name: "",
    email: "",
    password: "",
    emailVerified: false,
    accountStatus: "unverified",
    authErrCode: { 
        signup: "",
        login: ""
    }
}
export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "STOP_LOADING":
            return{
                ...state,
                loading: false
            }
        case "AUTH_ERROR":
            return {
                ...state,
                authErrCode: {
                    ...state.authErrCode,
                    [action.key]: action.errCode
                },
                loading: false
            }
        case "AUTHENTICATE":
            return {
                ...state,
                ...action.user,
                isAuthenticated: true,
                authErrCode: initialState.authErrCode,
                loading: false
            }
        case "LOGOUT":
            return {
                ...initialState,
                loading:false
            }
        default:
            return state;
    }
}
function authenticate(user) {
    return {
        type: "AUTHENTICATE",
        user
    }
}

export function verify (){
    return dispatch =>{
        profileAxios.get("/api/profile")
        .then(response => {
            const {user} = response.data;
            dispatch (authenticate(user));
        })
        .catch(err =>{
            dispatch({
                type: "STOP_LOADIN"
            })
        })
    }
}

export function signup(userInfo) {
    // make post request with user info, nad store the tokenn and user data that comes back
    return dispatch => {
        axios.post("/auth/signup", userInfo)
            .then(response => {
                const { token, user } = response.data
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user))
                dispatch(authenticate(user))
            })
            .catch(err => {
                dispatch(authError("signup", err.response.status))
            })
    }
}

export function login(credentials) {
    // make post request with user info, nad store the tokenn and user data that comes back
    return dispatch => {
        axios.post("/auth/login", credentials)
            .then(response => {
                const { token, user } = response.data
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user))
                dispatch(authenticate(user))
            })
            .catch(err => {
                dispatch(authError("login", err.response.status))
            })
    }
}

export function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    return {
        type: "LOGOUT"
    }
}

function authError(key, errCode) {
    return {
        type: "AUTH_ERROR",
        key,
        errCode
    }
}