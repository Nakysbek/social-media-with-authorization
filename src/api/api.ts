import axios from "axios";
import {SearchParamsStateType} from "../redux/pack-search-reducer";
import {CardsStateType} from "../redux/card-reducer";
import {CardSearchReducerType} from "../redux/cardSearch-reducer";

export const $api = axios.create({
    baseURL: "https://cards-nya-back-production.up.railway.app/2.0",
    headers: {
        "Content-Type": "application/json"
    },
    withCredentials: true
})

export class AuthService {
    static async registration(email: string, password: string) {
        return await $api.post('auth/register', {email, password})
    }

    static async login(email: string, password: string, rememberMe: boolean) {
        return await $api.post('auth/login', {email, password, rememberMe})
    }

    static async authMe() {
        return await $api.post('auth/me', {})
    }

}

export class PacksService {
    static async getTable(params?: SearchParamsStateType) {
        if (params) {
            const keys = Object.keys(params)
            let searchParams = ""
            keys.forEach((k) => {
                const value = params[k as keyof SearchParamsStateType]
                if (value) {
                    searchParams += k + "=" + value + "&"
                }
            })
            return await $api.get('cards/pack?' + searchParams)
        } else {
            return await $api.get('cards/pack?')
        }
    }

    static async addTable(name: string) {
        return await $api.post('cards/pack', {cardsPack: {name: name}})
    }

    static async removeTable(id: string) {
        return await $api.delete(`cards/pack?id=${id}`)
    }

    static async changeTable(id: string, newName: any) {
        return await $api.put(`cards/pack`, {cardsPack: {_id: id, name: newName}})
    }
}

export class CardService {
    static async getNewCard(cardsPackId?: string, params?: CardSearchReducerType) {
        if (params) {
            const keys = Object.keys(params)
            let searchParams = ""
            keys.forEach((k) => {
                const value = params[k as keyof CardSearchReducerType]
                if (value) {
                    searchParams += "&" + k + "=" + value
                }
            })
            return await $api.get(`cards/card?cardsPack_id=${cardsPackId}` + searchParams)
        } else {
            return await $api.get(`cards/card?cardsPack_id=${cardsPackId}`)
        }
    }

    static async getCard(cardsPackId?: string) {
        return await $api.get(`cards/card?cardsPack_id=${cardsPackId}`)
    }

    static async addCard(question: string, answer: string, cardsPackId?: string) {
        return await $api.post('cards/card', {card: {cardsPack_id: cardsPackId, question: question, answer: answer}})
    }

    static async removeCard(cardId: string) {
        return await $api.delete(`cards/card?id=${cardId}`)
    }

    static async changeCard(cardId: string, question: string, answer: string) {
        return await $api.put('cards/card', {card: {_id: cardId, question: question, answer: answer}})
    }
}





