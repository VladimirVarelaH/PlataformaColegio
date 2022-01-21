import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import {useState, useEffect} from 'react';
import "../style.css"
import {useDispatch, useSelector} from "react-redux";
import {addingAsign, getCursos} from "../redux/actions/cursosActions.js"


//var fecha = new Date();
//var anio = fecha.getFullYear();


export function AsignaturasForm(){
    const dispatcher = useDispatch();

    //Trae cursos
    const cursos = useSelector((store => store.cursosReducer.cursos));

    

    //Crear asignatura
    const [curso_id, setCurso] = useState("");
    //const curso_id = 1;
    const [nombre, setNombre] = useState("");
    //const [anio, setAnio] = useState("");

    const handleCurso = (event)=>{
        setCurso(event.target.value);
        console.log(curso_id)
    }
    const handleNombre = (event)=>{
        setNombre(event.target.value);
    }
    // const handleAnio = (event)=>{
    //     setAnio(event.target.value);
    // }

    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post("http://localhost:8080/asignserv/create", {
            id_curso: curso_id,
            nombre: nombre,
            //anio: anio,
        }).then((data)=>{
            console.log("Todo bien rey");
            console.log(data);
            dispatcher(addingAsign(false))
        }).catch((error)=>{
            alert(error);
        })
    }
    const creando = false;
    if (addingAsign){
    return(
        < >
            {/*console.log("agragando")*/}
            <form class="asignForm">
                <br></br>
                <button class="asignClose" type="reset" onClick={()=>dispatcher(addingAsign(false))}>X</button>
                <br></br>
                <laberl for="nombre">Nombre</laberl> <br></br>
                <input type="text" placeholder="nombre de la asignatura"
                id="nombre" onChange={handleNombre} required></input><br></br>
                {/*<label for="anio">Año de vigencia</label><br></br>
                <input type="number" id="anio" value={anio}
                onChange={handleAnio} required></input><br></br>*/}
                <label for="curso">Curso</label><br></br>
                <select id="curso" onChange={handleCurso} value={curso_id} required>
                    <option>cursos</option>
                    {cursos.map((a)=>
                        <option class="asignText" value={a.id}>{a.nombre} </option> )}
                </select> <br></br>
                <br></br>
                <button onClick={handleSubmit}>Agregar</button>
            </form> 
            
        </>)}else{
            console.log("no esta agregando")
        }

    
}
/*
*/