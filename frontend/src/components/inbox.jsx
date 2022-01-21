import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from "react-redux";
import {inboxReducer} from "../redux/actions/inboxActins.js"
import {login} from "../redux/actions/authActions.js"
import "../style.css"
//Para la vista de la bandeja de entrada
import {Mensage} from "./mensage.jsx"
import {MensageButon} from "./mensagebuton.jsx"
//Para la vista del Reader
import {MensageReader} from "./mensageread"
//Para la vista del Writer
import {MensageWriter} from "./mensagewriter"
import {LoginForm} from "./loginform"


export function InBox(){
    //Importa el componente activ del Recucer asociado 
    const read = useSelector((store)=> store.inboxReducer.activ);
    const isLogged = useSelector((store => store.authReducer.isLogged));

    return isLogged ?(
        <>
        {/* Aqui va Mensage*/}
        <MensageButon />

        <div class="containerInBox">

            <hr></hr>

            <div>
            {read ? (<Mensage/>):(<MensageWriter/>)}
            </div>

            <hr></hr>

        </div>
        </>
    ):(<LoginForm/>)
}

/* 
if (ccc){
    oiDJ
}else{
    io
};
*/