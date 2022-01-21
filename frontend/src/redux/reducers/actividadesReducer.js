import {GET_ACTIVITIES, CHANGE_ADMIN, CHANGE_EDITING, CHANGE_CREATING, EXPORT_PROPS, CHANGE_DELETING, EXPORT_DELETE_PROPS} from "../actions/actividadesActions.js";

const initialState= {
    actividades : [],
    administrando: false,
    creando: false,
    editando: false,
    propsEdit: {},
    eliminando: false,
    delteProps: {}
}

const actividadesReducer = ( state = initialState, action) => {
    switch(action.type) {
        case GET_ACTIVITIES:
            return {
                ...state,
                actividades: action.payload,
            };
        case CHANGE_ADMIN:
            return {
                ...state,
                administrando: action.payload,
            };
        case CHANGE_EDITING:
            return{
                ...state,
                editando: action.payload
            }
        case CHANGE_CREATING:
            return{
                ...state,
                creando: action.payload,
            }
        case EXPORT_PROPS:
            return{
                ...state,
                propsEdit: action.payload,
            }
        case CHANGE_DELETING:
            return{
                ...state,
                eliminando: action.payload,
            }
        case EXPORT_DELETE_PROPS:
            return{
                ...state,
                delteProps: action.payload,
            }
        default:
            return state;
    }
}

export default actividadesReducer;