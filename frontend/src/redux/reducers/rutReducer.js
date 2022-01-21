import { SET_RUT } from '../actions/rutActions.js';

const initialState = {
    rut: "",
};

const rutReducer = ( state = initialState, action) => {
    switch(action.type) {
        case SET_RUT:
            return {
                ...state,
                rut: action.payload,
            };
        
        default:
            return state;
    }
}


export default rutReducer;
