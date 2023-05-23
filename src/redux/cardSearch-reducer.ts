
type CardsActionType =
    | ReturnType<typeof getCardsBySearchAC>
    | ReturnType<typeof setCardsPageCountAC>
    | ReturnType<typeof setCardsPageNumberAC>

export type CardSearchReducerType = {
    cardQuestion: string,
    cardAnswer: string,
    maxGrade: number,
    minGrade: number,
    page: number,
    pageCount: number,
    packUserId: string,
}

const initialCardSearchState: CardSearchReducerType = {
    cardQuestion: '',
    cardAnswer: '',
    maxGrade: 0,
    minGrade: 0,
    page: 1,
    pageCount: 8,
    packUserId: '',
}

export const cardSearchReducer = (state: CardSearchReducerType = initialCardSearchState, action: CardsActionType) => {
    switch (action.type) {
        case "GET_CARDS_BY_SEARCH":
            return {...state, cardQuestion: action.cardQuestion}
        case 'SET_CARD_PAGE_COUNT':
            return {...state, pageCount: action.pageCount}
        case 'SET_PAGE_NUMBER':
            return {...state, page: action.page}
        default:
            return state
    }
}

export const setCardsPageNumberAC = (page: number) => ({
    type: 'SET_PAGE_NUMBER' as const, page: page
})

export const getCardsBySearchAC = (cardQuestion: string) => ({
    type: 'GET_CARDS_BY_SEARCH' as const,
    cardQuestion: cardQuestion
})

export const setCardsPageCountAC = (pageCount: number) => ({
    type: 'SET_CARD_PAGE_COUNT' as const,
    pageCount: pageCount
})


