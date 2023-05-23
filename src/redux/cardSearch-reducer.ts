
type CardsActionType = ReturnType<typeof getTableBySearchCardAC>

type CardSearchReducerType = {
    question: string,
    answer: string,
    maxGrade: number,
    minGrade: number,
    page: number,
    pageCount: number,
    packUserId: string,
}

const initialCardSearchState: CardSearchReducerType = {
    question: '',
    answer: '',
    maxGrade: 0,
    minGrade: 0,
    page: 0,
    pageCount: 0,
    packUserId: '',
}

export const cardSearchReducer = (state: CardSearchReducerType = initialCardSearchState, action: CardsActionType) => {
    switch (action.type) {
        case "GET_CARDS_BY_SEARCH":
            return { ...state, question: action.question}
        default:
            return state
    }
}

export const getTableBySearchCardAC = (question: string) => ({
    type: 'GET_CARDS_BY_SEARCH' as const, question: question
})