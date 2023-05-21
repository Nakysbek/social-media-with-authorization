import {Dispatch} from "redux";
import {PacksService} from "../api/api";
import {AppRootStateType} from "./store";

type GetTableAT = {
    type: 'GET_TABLE',
    data: any,
}

type RemoveTableAT = {
    type: 'REMOVE_TABLE',
    id: string,
}

type AddPackAT = {
    type: "ADD_PACK",
    newPack: CardPacks,
}

type ChangePackAT = {
    type: "CHANGE_PACK",
    changePack: CardPacks,
}

type SetLoadingAT = {
    type: "SET_LOADING",
    loading: boolean
}

type ActionType = GetTableAT | RemoveTableAT | AddPackAT | ChangePackAT | SetLoadingAT;

export type CardPacks = {
    _id: string,
    user_id: string,
    name: string,
    cardsCount: number,
    created: string,
    updated: string,
}

export type TableStateType = {
    cardPacks: CardPacks[],
    cardPacksTotalCount: number,
    maxCardsCount: number,
    minCardsCount: number,
    page: number,
    pageCount: number,
    loading: boolean
}

const initialState : TableStateType = {
    cardPacks: [
        {
            _id: "",
            user_id: "",
            name: "",
            cardsCount: 0,
            created: "",
            updated: "",
        },
    ],
    cardPacksTotalCount: 0, // количество колод
    maxCardsCount: 0,
    minCardsCount: 0,
    page: 0, // выбранная страница
    pageCount: 0, // количество элементов на странице
    loading: false
}

export const tableReducer = (state: TableStateType = initialState, action: ActionType): TableStateType => {
    switch (action.type) {
        case 'GET_TABLE':
            return {...state, ...action.data}
        case 'REMOVE_TABLE':
            return {...state, cardPacks: state.cardPacks.filter((pack) => pack._id !== action.id)}
        case "ADD_PACK":
            return {...state, cardPacks: [action.newPack, ...state.cardPacks]}
        case "CHANGE_PACK":
            return {...state, cardPacks: state.cardPacks.map((pack) => pack._id === action.changePack._id ? action.changePack : pack)}
        case "SET_LOADING":
            return {...state, loading: action.loading}
        default:
            return state;
    }
}

const getTableAC = (data: any): GetTableAT => ({type: 'GET_TABLE', data: data});
const removePackAC = (id: string) => ({type: "REMOVE_TABLE", id});
const addPackAC = (newPack: CardPacks) => ({type: "ADD_PACK", newPack});
const changePackAC = (changePack: CardPacks) => ({type: "CHANGE_PACK", changePack});
export const setLoadingAC = (loading: boolean) => ({type: "SET_LOADING", loading})

export const getTableTC = () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    try {
        dispatch(setLoadingAC(true))
        const response = await PacksService.getTable(state.searchReducer)
        dispatch(getTableAC(response.data))
    } catch (e) {
        console.error('error:', e);
    } finally {
        dispatch(setLoadingAC(false))
    }
}

export const addTableTC = (name: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoadingAC(true))
        const response = await PacksService.addTable(name)
        dispatch(addPackAC(response.data.newCardsPack))
    } catch (e) {
        console.error('error:', e);
    } finally {
        dispatch(setLoadingAC(false))
    }
}

export const removePackTC = (id: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoadingAC(true))
        const response = await PacksService.removeTable(id)
        dispatch(removePackAC(id))
    } catch (e) {
        console.error('error', e)
    } finally {
        dispatch(setLoadingAC(false))
    }
}

export const changeTableTC = (id: string, newName: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoadingAC(true))
        const response = await PacksService.changeTable(id, newName)
        dispatch(changePackAC(response.data.updatedCardsPack))
    } catch (e) {
        console.log('error', e)
    } finally {
        dispatch(setLoadingAC(false))
    }
}


