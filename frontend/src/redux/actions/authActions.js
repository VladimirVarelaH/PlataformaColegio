export const ACTION_LOGIN = 'ACTION_LOGIN';

export const login = (status) =>{
    return{
        type: ACTION_LOGIN,
        payload: status
    }
}