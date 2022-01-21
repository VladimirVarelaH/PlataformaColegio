import React, {useState, useEffect} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from "react-redux";
import {changeActive} from "../redux/actions/inboxActins.js"
import {changeCreating, changeEditing} from "../redux/actions/actividadesActions.js"
import {getCursos } from '../redux/actions/cursosActions.js';
import "../style.css"
import {Button, Alert} from "react-bootstrap";


export function ActivityEditor (props){
    //redux
    const dispatch = useDispatch();

    //reducers actividades
    const id = props.editProps.id;
    const [fecha, setFecha] = useState(props.editProps.fecha);
    const [descripcion, setDescripcion] = useState(props.editProps.descripcion);

    //handlers
    const handleFecha = (event)=>{
        setFecha(event.target.value)
    }
    const handleDescripcion = (event)=>{
        setDescripcion(event.target.value)
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        
        axios.put("http://localhost:8080/actserv/updateActividad/"+ id, 
                    {fecha: fecha, descripcion: descripcion})
        .then(()=>{
            console.log("Todo fine")
            dispatch(changeEditing(false));
        })
    }
    
    return(
        <section class="backgroundReader">
            
            <div className="bg-dark p-3" class="closeReader">
                <Button variant="danger" onClick={()=> dispatch(changeEditing(false))}>X</Button>
            </div>
            <input type="date" value = {fecha} placeholder="Fecha... 2021-10-02" class="asuto" onChange={handleFecha}></input>
            
            <input type="text" value = {descripcion} class="mensaje" onChange={handleDescripcion}></input>
            <button class="btn-primary-write" onClick={handleSubmit} type="submit">Enviar</button>
        </section>
    )
}