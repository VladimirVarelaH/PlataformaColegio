import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from "react-redux";

import {changeCreating} from "../redux/actions/actividadesActions.js"
import "../style.css"
//import {Button } from "react-bootstrap";


export function Btn_createActividad(){
    const creando = useSelector((store)=> store.actividadesReducer.creando);

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
        }console.log("autorizacion: ", autorizacion) //no borrar!!!
    })
    
    const dispatch = useDispatch();

    function renderButton (autorizacion, creando){
        if (autorizacion && creando){
            return(<div></div>);
        } if (autorizacion && !creando){
            return (<button 
                    class="butonMensage" 
                    onClick={()=> dispatch(changeCreating(true))}>
                        Crear Actividad
                    </button>)
        }if(!autorizacion){
            return(<div></div>)
        }
    }

    return(
        < >
            {
                //evalua los permisos y renderiza o no el boton
                renderButton(autorizacion, creando)
            }
        </>

    )
}