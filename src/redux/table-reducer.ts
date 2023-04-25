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

type ActionType = GetTableAT | RemoveTableAT | AddPackAT | ChangePackAT;

export type CardPacks = {
    _id: string,
    user_id: string,
    name: string,
    cardsCount: number,
    created: string,
    updated: string,
}

type StateType = {
    cardPacks: CardPacks[],
    cardPacksTotalCount: number,
    maxCardsCount: number,
    minCardsCount: number,
    page: number,
    pageCount: number,
}

const initialState = {
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
}

export const tableReducer = (state: StateType = initialState, action: ActionType): StateType => {
    switch (action.type) {
        case 'GET_TABLE':
            return {...state, ...action.data}
        case 'REMOVE_TABLE':
            return {...state, cardPacks: state.cardPacks.filter((pack) => pack._id !== action.id)}
        case "ADD_PACK":
            return {...state, cardPacks: [action.newPack, ...state.cardPacks]}
        case "CHANGE_PACK":
            return {...state, cardPacks: state.cardPacks.map((pack) => pack._id === action.changePack._id ? action.changePack : pack)}
        default:
            return state;
    }
}

const getTableAC = (data: GetTableAT) => ({type: 'GET_TABLE', data: data});
const removePackAC = (id: string) => ({type: "REMOVE_TABLE", id});
const addPackAC = (newPack: CardPacks) => ({type: "ADD_PACK", newPack});
const changePackAC = (changePack: CardPacks) => ({type: "CHANGE_PACK", changePack});

export const getTableTC = () => async (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const state = getState();
    try {
        const response = await PacksService.getTable(state.searchReducer)
        dispatch(getTableAC(response.data))
    } catch (e) {
        console.error('error:', e);
    }
}
export const addTableTC = (name: string) => async (dispatch: Dispatch) => {
    try {
        const response = await PacksService.addTable(name)
        dispatch(addPackAC(response.data.newCardsPack))
    } catch (e) {
        console.error('error:', e);
    }
}
export const removePackTC = (id: string) => async (dispatch: Dispatch) => {
    try {
        const response = await PacksService.removeTable(id)
        dispatch(removePackAC(id))
    } catch (e) {
        console.error('error', e)
    }
}
export const changeTableTC = (id: string, newName: string) => async (dispatch: Dispatch) => {
    try {
        const response = await PacksService.changeTable(id, newName)
        dispatch(changePackAC(response.data.updatedCardsPack))
    } catch (e) {
        console.log('error', e)
    }
}


