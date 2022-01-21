import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from "react-redux";
import {changeActive} from "../redux/actions/inboxActins.js"
import "../style.css"
//import {Button } from "react-bootstrap";


export function MensageButon(){
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
        }console.log(autorizacion)
    })
    
    const dispatch = useDispatch();
    return(
        < >
            {
                //evalua los permisos y renderiza o no el boton
                autorizacion ? (
                    <button 
                    class="butonMensage" 
                    onClick={()=> dispatch(changeActive(false))}>
                        Nuevo
                    </button>
                ):(<div></div>)
            }
        </>

    )
}