import {applyMiddleware, combineReducers, createStore} from 'redux';
import thunk from 'redux-thunk'
import {authReducer} from "./auth-reducer";
import {tableReducer} from "./table-reducer";
import {PackSearchReducer} from "./pack-search-reducer";
import {cardReducer} from "./card-reducer";
import {cardSearchReducer} from "./cardSearch-reducer";

const rootReducer = combineReducers({
    authReducer: authReducer,
    tableReducer: tableReducer,
    PackSearchReducer: PackSearchReducer,
    cardReducer: cardReducer,
    cardSearchReducer: cardSearchReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunk)); // для того чтобы писать асинхронный код,
// таким образом мы очищаем компоненты и не пишем запросы внутри компоненты

// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>

// а это, чтобы можно было в консоли браузера обращаться к store в любой момент
// @ts-ignore
window.store = store;