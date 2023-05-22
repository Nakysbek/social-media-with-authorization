import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {
    SearchParamsStateType,
    setMinMaxMeaningAC,
    setPageCountNumberAC,
    setPageNumberAC
} from "../../redux/search-reducer";
import s from './Pagination.module.css'
import {TableStateType} from "../../redux/table-reducer";
import {Selector} from "../Selector/Selector";
import debounce from "lodash.debounce";


export const Pagination = () => {

    const dispatch = useDispatch<any>()

    const {cardPacksTotalCount} = useSelector<AppRootStateType, TableStateType>(state => state.tableReducer)
    const {page, pageCount} = useSelector<AppRootStateType, SearchParamsStateType>(state => state.searchReducer)

    const totalPage = Math.ceil(cardPacksTotalCount / pageCount)

    const firstPage = () => {
        dispatch(setPageNumberAC(1))
    }

    const lastPage = () => {
        dispatch(setPageNumberAC(totalPage))
    }

    const PrevPage = () => {
        dispatch(setPageNumberAC(page - 1))
    }

    const NextPage = () => {
        dispatch(setPageNumberAC(page + 1))
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
        dispatch(setPageCountNumberAC(value))
    }

    return (
        <nav className={s.nav_ex2}>
            <div className={s.pagination}>
                {/*<button className={s.navButton} onClick={firstPage} disabled={page === 1}>&lt;&lt;</button>*/}
                <button className={s.navButton} onClick={PrevPage} disabled={page === 1}>&lt;</button>

                {pagesArray.map(pg =>
                    <button key={pg}
                            className={page == pg ? s.navButton_focus : s.navButton}
                            onClick={() => dispatch(setPageNumberAC(pg))}>
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

