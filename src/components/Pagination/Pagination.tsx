import React, {useEffect, useState} from 'react';
import {$api} from "../../api/api";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../redux/store";
import {TableStateType} from "../../redux/table-reducer";
import {SearchParamsStateType, setPageNumber} from "../../redux/search-reducer";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;


export const Page = () => {
    const dispatch = useDispatch<any>()
    const {cardPacksTotalCount} = useSelector<AppRootStateType, TableStateType>(state => state.tableReducer)
    const {page, pageCount} = useSelector<AppRootStateType, SearchParamsStateType>(state => state.searchReducer)
    // const [page, setPage] = useState(1)
    const [packs, setPacks] = useState([])

    useEffect(() => {
        $api.get(`/cards/pack/?page=${page}&pageCount=${6}`).then(res => {
            console.log('res.data: ', res.data);
            setPacks(res.data)
        })
    }, [])

    if (isLoading) return <p>Loading Users...</p>

    if (isError) return <p>Error: {error.message}</p>

    const content = users.data.map(user => <User key={user.id} user={user} />)

    const lastPage = () => {
        dispatch(setPageNumber(Math.ceil(cardPacksTotalCount / pageCount)))
    }

    const firstPage = () => {
        dispatch(setPageNumber(1))
    }

    const pagesArray = Array(Math.ceil(cardPacksTotalCount / pageCount)).fill(1).map((i, index) => index + 1)

    return (
        <nav className="nav-ex2">
            <button onClick={firstPage} disabled={page === 1}>&lt;&lt;</button>
            {/* Removed isPreviousData from PageButton to keep button focus color instead */}
            {pagesArray.map(pg => <button key={pg} onClick={() => dispatch(setPageNumber(pg))}>{pg}</button>)}
            <button onClick={lastPage} disabled={page === Math.ceil(cardPacksTotalCount / pageCount)}>&gt;&gt;</button>
        </nav>
    );
};

