import React from 'react';
import s from "./CardTableColumns.module.css";
import {CardsType} from "../../../../redux/card-reducer";
import {cardColumnsType} from "../Cards";
import {AiFillStar, AiOutlineStar} from "react-icons/ai";
import {log} from "util";

type CardTableColumnsType = {
    cards: CardsType[],
    cardColumns: cardColumnsType[],
    userId: string,
    setDeleteCard: (value: CardsType | null) => void,
    setEditCardHandler: (value: CardsType | null) => void,

}

export const CardTableColumns = ({
                                     cards,
                                     cardColumns,
                                     userId,
                                     setDeleteCard,
                                     setEditCardHandler
                                 }: CardTableColumnsType) => {

    if (!cards.length) return (
        <tr style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <td>Nothing found!</td>
        </tr>
    )

    return (
        <>
            {
                cards.map((item, index) => (
                    <tr className={s.card} key={index}>
                        {cardColumns.map((card, index) => {
                            if (card.key === "actions" && item?.user_id === userId) {
                                return <td key={index}>
                                    <button onClick={() => setDeleteCard(item)} className={s.orangeButton}>
                                        Delete
                                    </button>

                                    <button onClick={() => setEditCardHandler(item)} className={s.blueButton}>
                                        Edit
                                    </button>
                                </td>
                            } else if (card.key === 'rating') {
                                const starCount = Array(item.rating).fill(<AiFillStar/>)
                                if (starCount.length < 5) {
                                    for (let i = starCount.length; i < 5; i++) {
                                        starCount[i] = <AiOutlineStar/>
                                    }
                                }
                                return (
                                    <td key={index} className={s.rating}>
                                        {starCount}
                                    </td>
                                )
                            }
                            return <td key={index}>
                                {item?.[card.key as keyof typeof item]}
                            </td>
                        })}
                    </tr>
                ))}

        </>
    );
};

