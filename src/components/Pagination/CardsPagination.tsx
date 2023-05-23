import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import s from './Pagination.module.css'
import {Selector} from "../Selector/Selector";
import {CardsStateType} from "../../redux/card-reducer";
import {CardSearchReducerType, setCardsPageNumberAC, setCardsPageCountAC} from "../../redux/cardSearch-reducer";

export const CardsPagination = () => {

    const dispatch = useDispatch<any>()

    const {cardsTotalCount} = useSelector<AppRootStateType, CardsStateType>(state => state.cardReducer)
    const {page, pageCount} = useSelector<AppRootStateType, CardSearchReducerType>(state => state.cardSearchReducer)

    const totalPage = Math.ceil(cardsTotalCount / pageCount)

    const firstPage = () => {
        dispatch(setCardsPageNumberAC(1))
    }

    const lastPage = () => {
        dispatch(setCardsPageNumberAC(totalPage))
    }

    const PrevPage = () => {
        dispatch(setCardsPageNumberAC(page - 1))
    }

    const NextPage = () => {
        dispatch(setCardsPageNumberAC(page + 1))
    }

    const pagesArray = Array(totalPage).fill(1).map((i, index) => index + 1)

    const [limit, setLimit] = useState(8);

    const options = [
        {value: 2, body: '2'},
        {value: 4, body: '4'},
        {value: 6, body: '6'},
        {value: 8, body: '8'},
    ]

    const changePage = (value: number) => {
        setLimit(value)
        dispatch(setCardsPageCountAC(value))
    }

    return (
        <nav className={s.nav_ex2}>
            <div className={s.pagination}>
                {/*<button className={s.navButton} onClick={firstPage} disabled={page === 1}>&lt;&lt;</button>*/}
                <button className={s.navButton} onClick={PrevPage} disabled={page === 1}>&lt;</button>

                {pagesArray.map(pg =>
                    <button key={pg}
                            className={page == pg ? s.navButton_focus : s.navButton}
                            onClick={() => dispatch(setCardsPageNumberAC(pg))}>
                        {pg}
                    </button>
                )}

                <button className={s.navButton} onClick={NextPage} disabled={page === totalPage}>&gt;</button>
                {/*<button className={s.navButton} onClick={lastPage} disabled={page === totalPage}>&gt;&gt;</button>*/}
            </div>


            <div className={s.selector}>
                <h5>Show</h5>
                <Selector value={limit}
                          options={options}
                          onChange={(value: number) => changePage(value)}
                />
                <h5>Cards per page</h5>
            </div>

        </nav>
    );
};

