import {GET_CURSOS} from "../actions/cursosActions.js";
import {ADDING_ASIGN} from "../actions/cursosActions.js";


const intialState = {
    adding: false,
    cursos : []
};

const cursosReducer = (state = intialState, action)=> {
    switch(action.type) {
        case GET_CURSOS:
            return{
                ...state,
                cursos: action.payload
            };
        
        case ADDING_ASIGN:
            return{
                ...state,
                adding: action.payload
            };
        default:
            return state;
    }
}

export default cursosReducer;