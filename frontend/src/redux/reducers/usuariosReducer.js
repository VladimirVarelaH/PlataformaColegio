import {ACTION_WATCH_USER, SET_DATA_USUARIO} from "../actions/usuariosActions.js";

const initialState = {
    isWatching: false,
    usuarioData: {
        
    }
}

const usuariosReducer = ( state = initialState, action) => {
    switch(action.type) {
        case ACTION_WATCH_USER:
            return {
                ...state,
                isWatching: action.payload,
            };

        case SET_DATA_USUARIO:
            return{
                ...state,
                usuarioData: action.payload
            }
        default:
            return state;
    }
}


export default usuariosReducer;
