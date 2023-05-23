
type ActionsType =
    | ReturnType<typeof setPageNumberAC>
    | ReturnType<typeof setPageCountNumberAC>
    | ReturnType<typeof setMinMaxMeaningAC>
    | ReturnType<typeof setShowPacksAC>
    | ReturnType<typeof getTableBySearchAC>

export type SearchParamsStateType = {
    packName: string,
    min: number,
    max: number,
    page: number,
    pageCount: number,
    user_id: string,
}

const initialSearchState: SearchParamsStateType = {
    packName: "",
    min: 0,
    max: 25,
    page: 1,
    pageCount: 8,
    user_id: '',
}

export const PackSearchReducer = (state: SearchParamsStateType = initialSearchState, action: ActionsType): SearchParamsStateType => {
    switch (action.type) {
        case 'GET_TABLE_BY_SEARCH':
            return {...state, packName: action.packName}
        case 'SET_PAGE_NUMBER':
            return {...state, page: action.page};
        case 'SET_PAGE_COUNT_NUMBER':
            return {...state, pageCount: action.pageCount}
        case 'SET_MIN_MAX_MEANING':
            return {...state, min: action.min, max: action.max}
        case 'SET_SHOW_PACKS':
            return {...state, user_id: action.userId}
        default:
            return state;
    }
}

export const getTableBySearchAC = (packName: string) => ({
    type: 'GET_TABLE_BY_SEARCH' as const, packName
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

