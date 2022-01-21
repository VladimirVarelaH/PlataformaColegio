import { SET_PERMISOS, TIPO_DIRECTIVO } from "../actions/permisosAction";

const permisosInitialState = {
    permisos: [],
    tipoDirectivo: ""
}

const permisosReducer = (state = permisosInitialState, action)=> {
    switch (action.type){

        case SET_PERMISOS:
            return{
                ...state,
                permisos: action.payload
            }
        case TIPO_DIRECTIVO:
            return{
                ...state,
                tipoDirectivo: action.payload
            }

        default:
            return state;
    }
    
}

export default permisosReducer;