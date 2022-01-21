import { createStore, combineReducers } from 'redux';
import authReducer from './reducers/authReducer.js';
import inboxReducer from "./reducers/inboxReducer.js";
import rutReducer from "./reducers/rutReducer.js";
import permisosReducer from "./reducers/permisosReducer.js"
import cursosReducer from  "./reducers/cursosReducer.js"
import actividadesReducer from './reducers/actividadesReducer.js';
import usuariosReducer from './reducers/usuariosReducer.js';

const appReducer = combineReducers({
    authReducer: authReducer,
    inboxReducer: inboxReducer,
    rutReducer: rutReducer,
    permisosReducer: permisosReducer,
    cursosReducer: cursosReducer,
    actividadesReducer: actividadesReducer,
    usuariosReducer: usuariosReducer
});

export default createStore(appReducer);