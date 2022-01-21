export const SET_PERMISOS = "SET_PERMISOS";
export const TIPO_DIRECTIVO = "TIPO_DIRECTIVO"

export const setPermisos = (permisos) => {
    return {
        type: SET_PERMISOS,
        payload : permisos
    }
}
export const tipoDirectivo = (tipo)=>{
    return{
        type: TIPO_DIRECTIVO,
        payload: tipo
    }
}