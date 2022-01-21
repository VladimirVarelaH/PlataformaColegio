import {CHANGE_ACTIV_F} from "../actions/inboxActins.js"

const intialState = {
    activ : true,
};

const inboxReducer = (state = intialState, action)=> {
    switch(action.type) {
        case CHANGE_ACTIV_F:
            return{
                ...state,
                activ: action.payload,
            };
        default:
            return state;
    }
}

export default inboxReducer;