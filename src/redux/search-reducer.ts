import {CardPacks, setLoadingAC} from "./table-reducer";
import {Dispatch} from "redux";
import {SearchPacksService} from "../api/api";

type ActionsType = ReturnType<typeof getTableBySearchAC>
    | ReturnType<typeof setPageNumberAC>
    | ReturnType<typeof setPageCountNumberAC>
    | ReturnType<typeof setMinMaxMeaningAC>



export type SearchParamsStateType = {
    searchedCardPacks: CardPacks[]
    packName: string,
    min: number,
    max: number,
    sortPacks?: string,
    page: number,
    pageCount: number,
}

const initialSearchState: SearchParamsStateType = {
    searchedCardPacks: [
        {
            _id: "",
            user_id: "",
            name: "",
            cardsCount: 0,
            created: "",
            updated: "",
        },
    ],
    packName: "",
    min: 0,
    max: 25,
    sortPacks: '',
    page: 1,
    pageCount: 8
}

export const searchReducer = (state: SearchParamsStateType = initialSearchState, action: ActionsType): SearchParamsStateType => {
    switch (action.type) {
        case 'GET_TABLE_BY_SEARCH':
            return {...state, searchedCardPacks: action.searchedCardPacks};
        case 'SET_PAGE_NUMBER':
            return {...state, page: action.page};
        case 'SET_PAGE_COUNT_NUMBER':
            return {...state, pageCount: action.pageCount}
        case 'SET_MIN_MAX_MEANING':
            return {...state, min: action.min, max: action.max}
        default:
            return state;
    }
}

export const getTableBySearchAC = (searchedCardPacks: any) => ({
    type: 'GET_TABLE_BY_SEARCH' as const, searchedCardPacks
})

export const setPageNumberAC = (page: number) => ({
    type: 'SET_PAGE_NUMBER' as const, page: page
})

export const setPageCountNumberAC = (pageCount: number) => ({
    type: 'SET_PAGE_COUNT_NUMBER' as const, pageCount: pageCount
})

export const setMinMaxMeaningAC = (min: number, max: number) => ({
    type: 'SET_MIN_MAX_MEANING' as const, min: min, max: max
})


export const getTableBySearchTC = (name: string) => async (dispatch: Dispatch) => {
    try {
        dispatch(setLoadingAC(true))
        const response = await SearchPacksService.getSearchedPacks(name)
        dispatch(getTableBySearchAC(response.data.cardPacks))
    } catch (e) {
        console.error('error:', e);
    } finally {
        dispatch(setLoadingAC(false))
    }
}
