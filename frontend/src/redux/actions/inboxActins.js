
export const CHANGE_ACTIV_F = "CHANGE_ACTIV_F";

export const changeActive = (status) =>{
    return{
        type: CHANGE_ACTIV_F,
        payload: status
    }
}