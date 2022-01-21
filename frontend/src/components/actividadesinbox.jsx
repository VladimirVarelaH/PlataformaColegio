import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from "react-redux";
import "../style.css"
//Para la vista de la bandeja de entrada de actividades
import {ActividadAdmin} from "./actividadadmin.jsx"
import {Actividad} from "./actividad.jsx"
import {Btn_createActividad} from "./actividadbtn-create"
import {ActividadBtnAdmin} from "./actividadbtn-admin"
import { ActivityEditor } from './actividadesedit';
import { ConfirmarEliminacion } from './actividaddelete';
//Para la vista del Writer
import {ActivityCreator} from "./actividadescreator"
import {LoginForm} from "./loginform"


export function InBoxActividades(){
    //Importa el componente activ del Recucer asociado 
    const creando = useSelector((store)=> store.actividadesReducer.creando);
    const administrando = useSelector((store)=>store.actividadesReducer.administrando)
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    const editando = useSelector((store)=>store.actividadesReducer.editando);
    const editProps = useSelector((store)=> store.actividadesReducer.propsEdit);
    const deleteProps = useSelector((store)=> store.actividadesReducer.delteProps);
    const eliminando = useSelector((store)=>store.actividadesReducer.eliminando);
    
    //alert("Yo me ejecuto")
    function renderActivities(){
        if (administrando){
            return(<div>
                {!creando ? (<ActividadAdmin/>):(<><hr></hr><ActivityCreator/></>)}
                </div> )
        } if (editando){
            return(<><hr></hr><div><ActivityEditor editProps={editProps}/></div></>);
        }else{
            return(<><hr></hr><div><Actividad/></div></>)
        }
    }


    function renderButton(){
        if(administrando){
            return(<Btn_createActividad/>)
        } if (creando){
            return(<div></div>)
        } if (editando){
            return(<div></div>)
        } if (!administrando){
            return(<ActividadBtnAdmin/>)
        }
    }

    return isLogged ?(
        <>
            {/* {administrando ? (<Btn_createActividad/>):(<ActividadBtnAdmin/>)} */}
            {renderButton()}
            
            <div class="containerInBox">
                { (eliminando)?(<ConfirmarEliminacion deleteProps = {deleteProps}/>):(<></>)}
        
                { renderActivities() }
                <hr></hr>

            </div>
        </>
    ):(<LoginForm/>)
}