import React, {useState} from 'react';
import s from './ShowPackCards.module.css'
import {Slider} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../../redux/store";
import {SearchParamsStateType, setMinMaxMeaningAC} from "../../../../redux/search-reducer";

export const ShowPackCards = ({displayPacksHandler}: { displayPacksHandler: (value: string) => void; }) => {

    const dispatch = useDispatch<any>()

    const {min, max} = useSelector<AppRootStateType, SearchParamsStateType>(state => state.searchReducer)

    const [value, setValue] = useState<number[]>([min, max]);

    const handleChange = (event: Event, newValue: number | number[]) => {
        setValue(newValue as number[]);
        dispatch(setMinMaxMeaningAC(value[0], value[1]))
    }

    return (
        <div className={s.showPacksCards}>

            <h6>Show Packs Cards</h6>
            <div className={s.buttons}>
                <button onClick={() => displayPacksHandler('My')}>My</button>
                <button onClick={() => displayPacksHandler('')}>All</button>
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

