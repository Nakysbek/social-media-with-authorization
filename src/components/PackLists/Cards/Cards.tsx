import React, {useEffect, useState} from 'react';
import s from './Cards.module.css'
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";
import {authMeTC, AuthStateType} from "../../../redux/auth-reducer";
import {Header} from "../../Header/Header";
import {
    addCardTC,
    CardsStateType,
    CardsType,
    changeCardTC,
    getCardTC,
    removeCardTC
} from "../../../redux/card-reducer";
import {Modal} from "../../Modal/Modal";
import {MyButton} from "../../../UI/MyButton/MyButton";
import {CardTableColumns} from "./CardTableColumns/CardTableColumns";
import {Loader} from "../../Loader/Loader";
import {TableStateType} from "../../../redux/table-reducer";

export type cardColumnsType = {
    id: number,
    title: string,
    key: string,
}

export const Cards = () => {

    const navigate = useNavigate()
    const {cardsPackId} = useParams()
    const dispatch = useDispatch<any>()

    const {isAuth} = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer)
    const {cards} = useSelector<AppRootStateType, CardsStateType>(state => state.cardReducer)
    const {userId} = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer)
    const {loading} = useSelector<AppRootStateType, TableStateType>(state => state.tableReducer)


    const [addCardModalActive, setAddCardModalActive] = useState<boolean>(false)
    const [cardQuestionValue, setCardQuestionValue] = useState<string>('')
    const [cardAnswerValue, setCardAnswerValue] = useState<string>('')
    const [deleteCard, setDeleteCard] = useState<CardsType | null>(null)
    const [changeCard, setChangeCard] = useState<CardsType | null>(null)
    const [searchCard, setSearchCard] = useState<string>('')

    const filteredCards = cards.filter((card: CardsType) => card.question.toLowerCase().includes(searchCard.toLowerCase()))

    const addNewCard = (question: string, answer: string) => {
        dispatch(addCardTC(question, answer, cardsPackId))
        setCardQuestionValue('')
        setCardAnswerValue('')
        setAddCardModalActive(false)
    }

    const removeCard = (cardId: string) => {
        dispatch(removeCardTC(cardId))
        setDeleteCard(null)
    }

    const setEditCardHandler = (card: CardsType | null) => {
        setChangeCard(card)
        if (card) {
            setCardQuestionValue(card.question)
            setCardAnswerValue(card.answer)
        }
    }

    const onChangeHandler = (cardId: string, cardQuestionValue: string, cardAnswerValue: string) => {
        dispatch(changeCardTC(cardId, cardQuestionValue, cardAnswerValue))
        setCardQuestionValue('')
        setCardAnswerValue('')
        setChangeCard(null)
    }

    const onChangeCardQuestion = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardQuestionValue(e.target.value)
    }
    const onChangeCardAnswer = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCardAnswerValue(e.target.value)
    }

    const handleInputCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        setSearchCard(e.target.value);
    }

    const cardColumns: cardColumnsType[] = [
        {id: 1, title: "Question", key: "question"},
        {id: 2, title: "Answer", key: "answer"},
        // {id: 3, title: "Last updated", key: "updated"},
        {id: 4, title: "Rating", key: "rating"},
        {id: 5, title: "Actions", key: "actions"},
    ]

    useEffect(() => {
        if (!isAuth)
            dispatch(authMeTC(navigate))
    }, [])

    useEffect(() => {
        if (isAuth) {
            dispatch(getCardTC(cardsPackId))
        }
    }, [isAuth])

    return (
        <>
            <Header/>
            <div className={s.cardWrapper}>
                <div className={s.head}>
                    <button onClick={() => navigate(-1)}>back</button>
                    <h1>Pack Name</h1>
                </div>
                <div className={s.main}>
                    <input type='text' placeholder="Search..." value={searchCard} onChange={handleInputCardChange}/>
                    <button onClick={() => {
                        setAddCardModalActive(true)
                    }}>Add new card
                    </button>

                    <Modal active={addCardModalActive}>
                        <h3>Add new card</h3>
                        <input value={cardQuestionValue} onChange={onChangeCardQuestion} type='text'
                               placeholder='Question'/>
                        <input value={cardAnswerValue} onChange={onChangeCardAnswer} type='text' placeholder='Answer'/>
                        <div>
                            <MyButton onClick={() => addNewCard(cardQuestionValue, cardAnswerValue)}>Add</MyButton>
                            <MyButton onClick={() => setAddCardModalActive(false)}>Cancel</MyButton>
                        </div>
                    </Modal>
                </div>

                <Modal active={!!deleteCard}>
                    {deleteCard &&
                        <>
                            <h3>Do you really want to remove {deleteCard.question}?</h3>
                            <div>
                                <MyButton onClick={() => removeCard(deleteCard._id)}>Delete</MyButton>
                                <MyButton onClick={() => setDeleteCard(null)}>Cancel</MyButton>
                            </div>
                        </>
                    }
                </Modal>

                <Modal active={!!changeCard}>
                    {changeCard &&
                        <>
                            <h3>Edit the card</h3>
                            <input value={cardQuestionValue} onChange={onChangeCardQuestion} type='text'
                                   placeholder='Question'/>
                            <input value={cardAnswerValue} onChange={onChangeCardAnswer} type='text'
                                   placeholder='Answer'/>
                            <div>
                                <MyButton onClick={() => {
                                    onChangeHandler(changeCard._id, cardQuestionValue, cardAnswerValue)
                                    setChangeCard(null)
                                }}
                                >Edit</MyButton>
                                <MyButton onClick={() => {
                                    onChangeHandler('', '', '',)
                                    setChangeCard(null)
                                }}
                                >Cancel</MyButton>
                            </div>
                        </>
                    }
                </Modal>

                <table>
                    <thead>
                    <tr className={s.cardHead}>
                        {cardColumns.map((card, index) => <th key={index} className={s.oneCard}>{card.title}</th>)}
                    </tr>
                    </thead>
                    <tbody>
                    {loading
                        ? <Loader/>
                        : <CardTableColumns cards={filteredCards ? filteredCards : cards}
                                            cardColumns={cardColumns}
                                            userId={userId}
                                            setDeleteCard={setDeleteCard}
                                            setEditCardHandler={setEditCardHandler}
                        />
                    }
                    </tbody>
                </table>
            </div>
        </>
    );
};

