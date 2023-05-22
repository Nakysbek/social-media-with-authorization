import {AuthService} from "../api/api";
import {Dispatch} from "redux";

type RegistrationAT = {
    type: 'REGISTRATION'
    email: string
}

type LoginAT = {
    type: 'LOGIN'
    email: string
    isAuth: boolean
    token: string
    userId: string
}

type AuthMeAT = {
    type: 'AUTH_ME'
    email: string
    isAuth: boolean
    token: string
    userId: string
}

type SetLoadingAT = {
    type: "SET_LOADING",
    loading: boolean
}

type ActionType = | RegistrationAT | LoginAT | AuthMeAT | SetLoadingAT | ReturnType<typeof setErrorAC>

export type AuthStateType = {
    email: string
    error: string
    isAdmin: boolean
    isAuth: boolean
    token: string
    userId: string
    loading: boolean
}

const initialState = {
    email: '',
    error: '',
    isAdmin: false,
    isAuth: false,
    token: '',
    userId: '',
    loading: false
}

export const authReducer = (state: AuthStateType = initialState, action: ActionType): AuthStateType => {
    switch (action.type) {
        case 'REGISTRATION':
            return {...state, email: action.email};
        case 'LOGIN':
            return {...state, email: action.email, userId: action.userId, isAuth: action.isAuth};
        case 'AUTH_ME':
            return {...state, email: action.email, userId: action.userId, isAuth: action.isAuth}
        case 'SET_ERROR':
            return {...state, error: action.text}
        case "SET_LOADING":
            return {...state, loading: action.loading}
        default:
            return state;
    }
}

const registrationAC = (email: string) => ({type: 'REGISTRATION', email})
const setErrorAC = (text: string) => ({type: 'SET_ERROR' as const, text})
export const setLoadingAC = (loading: boolean) => ({type: "SET_LOADING", loading})

const loginAC = (email: string, token: string, userId: string, isAuth: boolean) => ({
    type: 'LOGIN', email, token, userId, isAuth
})

const authMeAC = (email: string, token: string, userId: string, isAuth: boolean) => ({
    type: 'AUTH_ME', email, token, userId, isAuth
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
        dispatch(setErrorAC(e.response.data.error))
    }
}

export const loginTC = (
    email: string,
    password: string,
    rememberMe: boolean,
    navigate: (path: string) => void) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoadingAC(true))
        const {data} = await AuthService.login(email, password, rememberMe)
        localStorage.setItem("token", data.token)
        dispatch(loginAC(data.email, data.token, data._id, true))
        navigate('/cards')
    } catch (e: any) {
        dispatch(setErrorAC(e.response.data.error))
    } finally {
        dispatch(setLoadingAC(false))
    }
}

export const authMeTC = (navigate: any) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoadingAC(true))
        const token = localStorage.getItem("token")
        if (token) {
            const response = await AuthService.authMe()
            localStorage.setItem("token", response.data.token)
            dispatch(authMeAC(response.data.email, token, response.data._id, true))
        }
    } catch (e) {
        navigate('/login')
        console.log('error:', e);
    } finally {
        dispatch(setLoadingAC(false))
    }
}