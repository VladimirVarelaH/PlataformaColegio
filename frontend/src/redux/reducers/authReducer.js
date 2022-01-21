import { ACTION_LOGIN } from '../actions/authActions.js';

const initialState = {
    isLogged: false,
};

const authReducer = ( state = initialState, action) => {
    switch(action.type) {
        case ACTION_LOGIN:
            return {
                ...state,
                isLogged: action.payload,
            };
        default:
            return state;
    }
}


export default authReducer;
