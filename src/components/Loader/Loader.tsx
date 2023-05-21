import React from 'react';
import loader from '../../assets/Spin-1.5s-200px.gif'
import s from './Loader.module.css'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {SearchParamsStateType} from "../../redux/search-reducer";

export const Loader = () => {
    const {pageCount} = useSelector<AppRootStateType, SearchParamsStateType>(state => state.searchReducer)

    const styleHeight = pageCount * 45 + 25;

    return (
        <tr className={s.loader} style={{height: styleHeight}}>
            <td>
                <img src={loader} alt="loading..."/>
            </td>
        </tr>
    );
};
