import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from "react-redux";
import {changeDeleting} from "../redux/actions/actividadesActions.js"
import axios from 'axios';
import "../style.css"


export function ConfirmarEliminacion(props){

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
        }//console.log("autorizacion: ", autorizacion)
    })
    
    const dispatch = useDispatch();
    const id = props.deleteProps.id //ahi te llega el id de la actividad
    const deleteAct = (event)=>{
        event.preventDefault();
        console.log("la id a eliminar es "+id);
        axios.delete("http://localhost:8080/actserv/delActividad/"+ id);
        dispatch(changeDeleting(false))
        
      }
    return(
        < >
            {
                //evalua los permisos y renderiza o no el boton
                autorizacion ? (
                    <div class="deleteBgrd">
                        <h3>¿Confirma la eliminación?</h3>
                        <div>
                            <button class="asignButton" onClick={deleteAct} value={props.deleteProps.id}>Sí</button>
                            <button onClick={()=>{dispatch(changeDeleting(false))}}>No</button>
                        </div>
                    </div>
                ):(<></>)
            }
        </>

    )
}