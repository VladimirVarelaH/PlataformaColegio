import React from 'react';
import { Asignatura } from './asignatura.jsx';
import {AsignaturasForm} from "./asignaturacreate.jsx"
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {useState, useEffect} from 'react';
import "../style.css"
import {useSelector, useDispatch} from "react-redux";
import { addingAsign, getCursos } from '../redux/actions/cursosActions.js';
//import {Button } from "react-bootstrap";

export function Asignaturas(){
    //Variables de control de renderizado
    const agregando = useSelector((store => store.cursosReducer.adding));
    const dispatcher = useDispatch();

    //Trae los cursos para usarlos en el formulario de creación
    const [cursos, setValores] = useState([]);
    useEffect (()=>{
        //
        axios.get("http://localhost:8080/courses/getCourses")
        //
        .then(res =>{
            let data = res.data;
            data = Array.from(data, x => x);
            console.log(data);
            setValores(data);
            dispatcher(getCursos(data))
        });
    }, []);

    return(
        < >
            <section class="containerInBox">
                {!agregando ?(
                <>
                <div class="asignHeader">
                    <button class="asignCreateBtn" 
                    onClick={()=>dispatcher(addingAsign(true))}>
                        Crear nueva asignatura
                    </button>
                </div>
                <section>
                    <Asignatura/>
                </section>
                </>):(<>
                <AsignaturasForm/>
                </>)}

                
            </section>
            
        </>

    )
}
/*
*/