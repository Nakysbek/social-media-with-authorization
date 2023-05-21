import React from 'react';
import s from './Header.module.css'
import {BiUser} from 'react-icons/bi'
import {TbCards} from 'react-icons/tb'
import {NavLink} from "react-router-dom";

export const Header = () => {
    return (
        <div className={s.header}>
            <NavLink to={'/cards'} >
                <h3>
                    <TbCards/> Pack list
                </h3>
            </NavLink>
            <NavLink to={'/profile'}>
                <h3>
                    <BiUser/>Profile</h3>
            </NavLink>
        </div>
    );
};

