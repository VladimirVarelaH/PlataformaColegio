export const GET_CURSOS = 'GET_CURSOS';

export const getCursos = (cursos) =>{
    return{
        type: GET_CURSOS,
        payload: cursos
    }
}

export const ADDING_ASIGN = "ADDING_ASIGN";

export const addingAsign = (booleano)=>{
    return{
        type: ADDING_ASIGN,
        payload: booleano,
    };
}