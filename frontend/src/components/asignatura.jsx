import React,{useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style.css"
//import {Button } from "react-bootstrap"; 
import axios from "axios";

export function Asignatura(){
    //Trae las asignaturas para darles formato
    const [asignaturas, setAsignaturas] = useState([]);

    useEffect (()=>{
        //
        axios.get("http://localhost:8080/asignserv/getAsignaturas")
        //
        .then(res =>{
            let data = res.data;
            data = Array.from(data, x => x);
            console.log(data);
            setAsignaturas(data);
        });
    }, []);

    const deleteAsign = (event) =>{
        let id = event.target.value;
        //alert("yo me ejecuto, asi que no me mires")
        axios.delete("http://localhost:8080/asignserv/delAsignatura/"+ id); 
    }

    return(
        < >
            {asignaturas.map((a)=>
            <div class="mensageInBox">
                <div class="asignTextSection">
                    <strong class="asignText">{a.nombre} </strong> 
                    {/*<p class="asignText">{a.anio}</p>*/}
                    <p class="asignText">{a.curso}</p>
                </div>
                <div class="asignButtonContainer"> 
                    <button class="asignButton" >Editar</button>
                    <button class="asignButton" onClick={deleteAsign} value={a.id}>Eliminar</button>
                </div>
                        
            </div>)}
            
        </>

    )
}