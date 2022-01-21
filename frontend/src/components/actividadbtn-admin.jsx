import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from "react-redux";
import {changeAdmin, changeCreating} from "../redux/actions/actividadesActions.js"
import "../style.css"
//import {Button } from "react-bootstrap";


export function ActividadBtnAdmin(){
    //trae la lista de permisos desde la store
    const permisos = useSelector((store => store.permisosReducer.permisos));
    //crea una variable para manejar el renderizado del boton
    let autorizacion = false;
    //valida los permisos para definir si dar o no autorizacion
    permisos.map((permiso)=>{
        if (permiso== "directivo"){
            autorizacion = true;
        } if (permiso =="profesor"){
            autorizacion = true;
        } if (permiso == "profesorJefe"){
            autorizacion = true;
        }console.log("autorizacion: ", autorizacion)
    })
    
    const dispatch = useDispatch();
    dispatch(changeCreating(false));
    return(
        < >
            {
                //evalua los permisos y renderiza o no el boton
                autorizacion ? (
                    <button 
                    class="butonMensage" 
                    onClick={()=> dispatch(changeAdmin(true))}>
                        Administrar Actividades
                    </button>
                ):(<div></div>)
            }
        </>

    )
}