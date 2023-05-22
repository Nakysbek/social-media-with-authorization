import {CardPacks} from "./table-reducer";

type ActionsType =
    | ReturnType<typeof setPageNumberAC>
    | ReturnType<typeof setPageCountNumberAC>
    | ReturnType<typeof setMinMaxMeaningAC>
    | ReturnType<typeof setShowPacksAC>
    | ReturnType<typeof getTableBySearchAC>

export type SearchParamsStateType = {
    searchedCardPacks: CardPacks[]
    packName: string,
    min: number,
    max: number,
    sortPacks?: string,
    page: number,
    pageCount: number,
    user_id: string,
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
    pageCount: 8,
    user_id: '',
}

export const searchReducer = (state: SearchParamsStateType = initialSearchState, action: ActionsType): SearchParamsStateType => {
    switch (action.type) {
        case 'SET_PAGE_NUMBER':
            return {...state, page: action.page};
        case 'SET_PAGE_COUNT_NUMBER':
            return {...state, pageCount: action.pageCount}
        case 'SET_MIN_MAX_MEANING':
            return {...state, min: action.min, max: action.max}
        case 'SET_SHOW_PACKS':
            return {...state, user_id: action.userId}
        case 'SET_MY_GET_TABLE':
            return {...state, packName: action.packName}
        default:
            return state;
    }
}

export const getTableBySearchAC = (packName: string) => ({
    type: 'SET_MY_GET_TABLE' as const, packName
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

export const setShowPacksAC = (userId: string) => ({
    type: 'SET_SHOW_PACKS' as const, userId: userId
})

