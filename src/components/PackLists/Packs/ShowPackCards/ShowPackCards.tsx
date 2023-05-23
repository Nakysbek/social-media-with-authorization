import React, {useState} from 'react';
import s from './ShowPackCards.module.css'
import {Slider} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../redux/store";
import {SearchParamsStateType, setMinMaxMeaningAC} from "../../../../redux/pack-search-reducer";
import debounce from "lodash.debounce";

type ShowPackCardsType = {
    displayPacksHandler: (value: string) => void
    userId: string
}

export const ShowPackCards = ({displayPacksHandler, userId}: ShowPackCardsType) => {

    const dispatch = useDispatch<any>()
    const {min, max} = useSelector<AppRootStateType, SearchParamsStateType>(state => state.PackSearchReducer)
    const [value, setValue] = useState<number[]>([min, max]);
    const [active, setActive] = useState('All')

    const meaningDebounce = React.useCallback(
        debounce((value) => {
            dispatch(setMinMaxMeaningAC(value[0], value[1]))
        }, 1000), []
    )

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        meaningDebounce(value)
    }

    const handleDisplayPack = (userId: string, value: string) => {
        displayPacksHandler(userId)
        setActive(value)
    }

    return (
        <div className={s.showPacksCards}>

            <h6>Show Packs Cards</h6>

            <div className={s.buttons}>
                <button onClick={() => handleDisplayPack(userId, "My")} className={active === 'My' ? s.activeButton : s.inactiveButton}>My</button>
                <button onClick={() => handleDisplayPack('', 'All')} className={active === 'All' ? s.activeButton : s.inactiveButton}>All</button>
            </div>

            <h6>Number of cards</h6>

            <Slider
                style={{width: "150px", color: '#21268F'}}
                getAriaLabel={() => 'Meaning range'}
                value={value}
                onChange={handleChange}
                valueLabelDisplay="auto"
            />
        </div>
    );
};

