import React, {useEffect, useState} from 'react';
import s from './Cards.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../redux/store";
import {addTableTC, CardPacks, changeTableTC, removePackTC, TableStateType,} from "../../../redux/table-reducer";
import {Modal} from "../../Modal/Modal";
import {MyButton} from "../../../UI/MyButton/MyButton";
import {TableColumns} from "../TableColumns/TableColumns";
import {Loader} from "../../Loader/Loader";
import {AuthStateType} from "../../../redux/auth-reducer";
import {Pagination} from "../../Pagination/Pagination";
import {ShowPackCards} from "./ShowPackCards/ShowPackCards";
import {getTableBySearchTC, SearchParamsStateType} from "../../../redux/search-reducer";

export type ColumnsType = {
    id: number;
    title: string;
    key: string;
}

export const Cards = () => {
    const dispatch = useDispatch<any>()
    const {userId} = useSelector<AppRootStateType, AuthStateType>(state => state.authReducer)
    const {cardPacks, loading} = useSelector<AppRootStateType, TableStateType>(state => state.tableReducer)
    const {searchedCardPacks} = useSelector<AppRootStateType, SearchParamsStateType>(state => state.searchReducer)
    const [addPackModalActive, setAddPackModalActive] = useState<boolean>(false)
    const [deleteItem, setDeleteItem] = useState<CardPacks | null>(null)
    const [editItem, setEditItem] = useState<CardPacks | null>(null)
    const [value, setValue] = useState<string>('')
    const [search, setSearch] = useState<string>('')

    // const filteredPacks = cardPacks.filter((pack: CardPacks) => pack.name.toLowerCase().includes(search.toLowerCase()))

    const [displayPacks, setDisplayPacks] = useState('All')

    const displayPacksHandler = (value: string) => {
        setDisplayPacks(value)
    }

    const addNewPack = (name: string) => {
        dispatch(addTableTC(name))
        setValue('')
        setAddPackModalActive(false)
    }

    const removeTable = (id: string) => {
        dispatch(removePackTC(id))
        setDeleteItem(null)
    }

    const changeTable = (id: string, newName: string) => {
        dispatch(changeTableTC(id, newName))
        setEditItem(null)
    }

    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        //// мини дебаунс
        if (search.length > 0) {
            dispatch(getTableBySearchTC(search.toLowerCase()))
        }
    }

    const setEdit = (item: CardPacks | null) => {
        setEditItem(item)
        if (item) {
            setValue(item.name)
        }
    }

    const columns: ColumnsType[] = [
        {id: 1, title: "Name", key: "name"},
        {id: 2, title: "Cards", key: "cardsCount"},
        {id: 3, title: "Created by", key: "user_name"},
        {id: 4, title: "Actions", key: "actions"},
    ]

    return (
        <div className={s.wrapper}>

            <ShowPackCards displayPacksHandler={displayPacksHandler}/>

            <div className={s.packs}>
                <div>
                    <h1>Packs list</h1>

                    <input className={s.input} type='text' placeholder="Search..." value={search} onChange={handleInputChange}/>

                    <button onClick={() => setAddPackModalActive(true)} className={s.button}>Add new pack</button>

                    <Modal active={addPackModalActive}>
                        <h3>Add new pack</h3>
                        <input value={value} onChange={onChangeName} type='text' placeholder='Name pack'/>
                        <div>
                            <MyButton onClick={() => addNewPack(value)}>Add</MyButton>
                            <MyButton onClick={() => setAddPackModalActive(false)}>Cancel</MyButton>
                        </div>
                    </Modal>
                </div>

                <Modal active={!!deleteItem}>
                    {deleteItem &&
                        <>
                            <h3>Do you really want to remove {deleteItem.name}?</h3>
                            <div>
                                <MyButton onClick={() => removeTable(deleteItem._id)}>Delete</MyButton>
                                <MyButton onClick={() => setDeleteItem(null)}>Cancel</MyButton>
                            </div>
                        </>
                    }
                </Modal>

                <Modal active={!!editItem}>
                    {editItem &&
                        <>
                            <h3>Do you want to edit the name {editItem.name}?</h3>
                            <input value={value} onChange={onChangeName} type='text' placeholder='Name pack'/>
                            <div>
                                <MyButton onClick={() => {
                                    changeTable(editItem._id, value)
                                    setValue('')
                                }}>Edit</MyButton>
                                <MyButton onClick={() => {
                                    setEditItem(null)
                                    setValue('')
                                }}>Cancel</MyButton>
                            </div>
                        </>
                    }
                </Modal>
                <div>
                    <table>
                        <thead>
                        <tr className={s.cards}>
                            {columns.map((c, index) => <th key={index}>{c.title}</th>)}
                        </tr>
                        </thead>
                        <tbody>
                        {loading
                            ? <Loader/>
                            : <TableColumns
                                displayPacks={displayPacks}
                                cardPacks={search ? searchedCardPacks : cardPacks}
                                columns={columns}
                                userId={userId}
                                setDeleteItem={setDeleteItem}
                                setEditItem={setEdit}
                            />
                        }
                        </tbody>
                    </table>

                    <Pagination/>

                </div>
            </div>
        </div>
    );
};


