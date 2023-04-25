import {AuthService} from "../api/api";
import {Dispatch} from "redux";

export type StateType = {
    email: string
    error: string,
    isAdmin: boolean;
    isAuth: boolean
    token: string
    userId: string
}

type RegistrationAT = {
    type: 'REGISTRATION';
    email: string;
}

type LoginAT = {
    type: 'LOGIN';
    email: string;
    isAdmin: boolean
    isAuth: boolean
    token: string
    userId: string
}

type ActionType = | RegistrationAT | LoginAT | ReturnType<typeof setError>

const initialState = {
    email: '',
    error: '',
    isAdmin: false,
    isAuth: false,
    token: '',
    userId: ''
}

export const authReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case 'REGISTRATION':
            return {...state, email: action.email};
        case 'LOGIN':
            return {...state, email: action.email, isAdmin: action.isAdmin, userId: action.userId, isAuth: action.isAuth};
        case 'SET_ERROR':
            return {...state, error: action.text}
        default:
            return state;
    }
}


const registrationAC = (email: string) => ({type: 'REGISTRATION', email})

const setError = (text: string) => ({
    type: 'SET_ERROR' as const, text
})

const loginAC = (email: string, isAdmin: boolean, token: string, userId: string, isAuth: boolean) => ({
    type: 'LOGIN', email, isAdmin, token, userId, isAuth
})

const authMeAC = (email: string, isAdmin: boolean, token: string, isAuth: boolean) => ({
    type: 'LOGIN', email, isAdmin, token, isAuth
})

export const registrationTC = (
    email: string,
    password: string,
    navigate: (path: string) => void) => async (dispatch: Dispatch) => {
    try {
        const {data} = await AuthService.registration(email, password)
        dispatch(registrationAC(data.email))
        navigate('/login')
    } catch (e: any) {
        dispatch(setError(e.response.data.error))
        console.log('error:', e);
    }
}

export const loginTC = (
    email: string,
    password: string,
    rememberMe: boolean,
    navigate: (path: string) => void) => async (dispatch: Dispatch) => {
    try {
        const {data} = await AuthService.login(email, password, rememberMe)
        localStorage.setItem("token", data.token)
        dispatch(loginAC(data.email, data.isAdmin, data.token, data._id, true))
        navigate('/posts')
    } catch (e: any) {
        console.log(e)
    }
}

export const authMeTC = (navigate: any) => async (dispatch: Dispatch) => {
    try {
        const token = localStorage.getItem("token")
        if (token) {
            const response = await AuthService.authMe()
            localStorage.setItem("token", response.data.token)
            dispatch(loginAC(response.data.email, response.data.isAdmin, token, response.data._id, true))
        }

    } catch (e) {
        navigate('/login')
        console.log('error:', e);
    }
}