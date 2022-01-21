import React, {useState, useEffect} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from "react-redux";
import {changeCreating} from "../redux/actions/actividadesActions.js"
import {getCursos } from '../redux/actions/cursosActions.js';
import "../style.css"
import {Button, Alert} from "react-bootstrap";


export function ActivityCreator (){
    const cursosList = useSelector((store => store.cursosReducer.cursos));
    const rut = useSelector((store => store.rutReducer.rut));
    const dispatch = useDispatch();

    const [cursosGet, setValores] = useState([]);
    useEffect (()=>{
        //
        axios.get("http://localhost:8080/courses/getCourses")
        //
        .then(res =>{
            let data = res.data;
            data = Array.from(data, x => x);
            console.log(data);
            setValores(data);
            dispatch(getCursos(data))
        });
    }, []);

    const [fecha, setFecha] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const rut_creador = rut;
    const [rut_citados, setRut] = useState([]);
    const [estado, setEstado] = useState("");
    const [curso_id, setCurso] = useState("");
    const [tipo, setTipo] = useState("");

    const handleTipo = (event)=>{
        //console.log(cod);
        setTipo(event.target.value);
    }
    const handleTodos = ()=>{
        delete json.individual;
        delete json.curso_id;
        json.todos = "todos";
    }
    const handleIndividual = (event)=>{
        let individuos = event.target.value;
        individuos = individuos.split([","]);
        setRut(individuos);
        console.log(individuos);
        delete json.todos;
        delete json.curso_id;
    }
    const handleCurso = (event)=>{
        setCurso(event.target.value);
        delete json.individual;
        delete json.todos;
        json.curso_id = event.target.value;
    }
    const handleFecha = (event)=>{
        setFecha(event.target.value);
    }
    const handleDescripcion = (event)=>{
        setDescripcion(event.target.value);
    }
    

    let json = {
        rut_creador: rut_creador,
        descripcion: descripcion,
        fecha: fecha,
        /* Opciones */
        tipo: tipo,
        curso_id: curso_id,
        individual: {
            rut_citados: rut_citados,
        },
        todos: 'todos'
    }
    

    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post("http://localhost:8080/actserv/create", json)
        .then((data)=>{
            dispatch(changeCreating(false))
            console.log(rut)
        }).catch((error)=>{
            setEstado("ERROR");
            alert(error);
        })
    }
    
    function renderFunction(tipo){
        if (tipo == "todos"){
            handleTodos();
            console.log(tipo);
            return(<input class="asuto" type="text" readOnly value="todos"></input>);
        }if(tipo == "individual"){
            return(<input class="asuto" type="text" 
            placeholder="introduzca los ruts separados por comas" onChange={handleIndividual}></input>)
        }if (tipo == "curso"){
            return(<select id="curso" onChange={handleCurso} value={curso_id} required>
                    <option>cursos</option>
                    {cursosList.map((a)=>
                        <option class="asignText" value={a.id}>{a.nombre} </option> )}
                </select>)
        }
    }
    return(
        <section class="backgroundReader">
            
            <div className="bg-dark p-3" class="closeReader">
                <Button variant="danger" onClick={()=> dispatch(changeCreating(false))}>X</Button>
            </div>
            <input type="date" placeholder="Fecha... 2021-10-02" class="asuto" onChange={handleFecha}></input>
            <label for="tipo">Tipo de usuarios a citar</label>
            <select id="tipo" value={tipo} onChange={handleTipo}required>
                <option>Seleccionar</option>
                <option value="todos">Todos</option>
                <option value="individual">Individual</option>
                <option value="curso"> Cursos</option>
            </select>
            {renderFunction(tipo)}
            <input type="text"  class="mensaje" onChange={handleDescripcion}></input>
            <button class="btn-primary-write" onClick={handleSubmit} type="submit">Enviar</button>
        </section>
    )
}