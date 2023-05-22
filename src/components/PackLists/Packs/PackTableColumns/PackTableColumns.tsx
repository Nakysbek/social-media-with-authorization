import React from 'react';
import s from "./PackTableColumns.module.css";
import {CardPacks} from "../../../../redux/table-reducer";
import {useNavigate} from "react-router-dom";
import {ColumnsType} from "../Packs";

type TableColumnsType = {
    cardPacks: CardPacks[];
    columns: ColumnsType[];
    userId: string;
    setDeleteItem: (value: CardPacks | null) => void;
    setEditItem: (value: CardPacks | null) => void;
}

export const PackTableColumns = ({cardPacks, columns, userId, setDeleteItem, setEditItem}: TableColumnsType) => {

    const navigate = useNavigate()

    const openedCard = (cardPack: CardPacks) => {
        if (cardPack.user_id === userId)
            navigate(`card/${cardPack._id}`)
    }

    if (!cardPacks.length) return (
        <tr style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <td>Nothing found!</td>
        </tr>
    )

    return (
        <>
            {
                cardPacks.map((cardPack: CardPacks, index: number) => (
                        <tr key={index} className={s.card}>
                            {columns.map((c, index: number) => {
                                if (c.key === "actions" && cardPack.user_id === userId) {

                                    return <td key={index}>
                                        <button onClick={() => setDeleteItem(cardPack)}
                                                className={s.orangeButton}>
                                            Delete
                                        </button>

                                        <button onClick={() => setEditItem(cardPack)}
                                                className={s.blueButton}>
                                            Edit
                                        </button>

                                        <button onClick={() => {
                                        }} className={s.blueButton}>
                                            Learn
                                        </button>
                                    </td>
                                }

                                return <td key={index} onClick={() => openedCard(cardPack)}>
                                    {cardPack[c.key as keyof typeof cardPack]}
                                </td>
                            })}
                        </tr>
                    )
                )}
        </>
    )
};

