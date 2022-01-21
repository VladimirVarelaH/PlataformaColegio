import React, {useState, useEffect} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from "react-redux";
import {changeActive} from "../redux/actions/inboxActins.js"
import "../style.css"
import {Button, Alert} from "react-bootstrap";


export function MensageWriter (){
    const cursosList = useSelector((store => store.cursosReducer.cursos));
    const rut = useSelector((store => store.rutReducer.rut));
    const dispatch = useDispatch();
    
    const [asunto, setAsunto] = useState("");
    const [cuerpo, setCuerpo] = useState("");
    const [estado, setEstado] = useState("");
    const [curso_id, setCurso] = useState("");
    const rut_emisor = rut;
    const [rut_receptores, setRut] = useState([]);
    const [tipo, setTipo] = useState("");


    const handleTipo = (event)=>{
        //console.log(cod);
        setTipo(event.target.value);
    }
    const handleAsunto = (event)=>{
        setAsunto(event.target.value);
    }
    const handleIndividual = (event)=>{
        let individuos = event.target.value;
        individuos = individuos.split([","]);
        setRut(individuos);
        console.log(individuos);
    }
    const handleCurso = (event)=>{
        setCurso(event.target.value);
    }
    const handleCuerpo = (event)=>{
        setCuerpo(event.target.value);
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post("http://localhost:8080/msgserv/sendMessage", {
            rut_emisor: rut_emisor,
            cuerpo: cuerpo,
            asunto: asunto,
            /* Opciones */
            tipo: tipo,
            curso_id: curso_id,
            individual: {
                rut_receptores: rut_receptores,
            },
            todos: 'todos'
        }).then((data)=>{
            setEstado("OK");
            dispatch(changeActive(true));
            console.log(rut)
        }).catch((error)=>{
            setEstado("ERROR");
            alert(error);
        })
    }

    function renderFunction(tipo){
        if (tipo == "todos"){
            //handleTodos();
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
                <Button variant="danger" onClick={()=> dispatch(changeActive(true))}>X</Button>
            </div>
            <input type="text" placeholder="Asunto" class="asuto" onChange={handleAsunto}></input>
            <label for="tipo">Tipo de usuarios de destino</label>
            <select id="tipo" value={tipo} onChange={handleTipo}required>
                <option>Seleccionar</option>
                <option value="todos">Todos</option>
                <option value="individual">Individual</option>
                <option value="curso"> Cursos</option>
            </select>
            {renderFunction(tipo)}
            {/*<input type="text" placeholder="Ingrese el rut de los desitinatarios separados por coma" class="asuto" onChange={handleIndividual}></input>*/}
            <input type="text"  class="mensaje" onChange={handleCuerpo}></input>
            <button class="btn-primary-write" onClick={handleSubmit} type="submit">Enviar</button>
            
            
        </section>
    )
}