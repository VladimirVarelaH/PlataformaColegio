export const ACTION_WATCH_USER = 'ACTION_WATCH_USER';

export const watch = (status) =>{
    return{
        type: ACTION_WATCH_USER,
        payload: status
    }
}

export const SET_DATA_USUARIO = 'SET_DATA_USUARIO';

export const setData = (data) =>{
    return{
        type: SET_DATA_USUARIO,
        payload: data
    }
}