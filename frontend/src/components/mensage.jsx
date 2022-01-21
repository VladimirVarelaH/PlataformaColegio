import React, {useState, useEffect} from 'react';
import {useSelector} from "react-redux";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style.css";
import {MensageButon} from "./mensagebuton.jsx"
import { useHistory } from "react-router-dom";
import {ListGroup} from "react-bootstrap";

export function Mensage(){
    //Se crea el arreglo que contrndra los valores
    let [valores, setValores] = useState([]);
    const rut = useSelector((store => store.rutReducer.rut));
    //Se crea una funcion que obtiene los valores utilizando una API con axios
    useEffect (()=>{
        //Se hace la solicitud a mindicador.cl
        axios.get("http://localhost:8080/msgserv/mensajes", { 
          params: { 
            rut: rut 
          } 
        })
        //Se toma la respuesta y se actualizan los valores del arreglo
        .then(res =>{
            let data = res.data;
            data = Array.from(data, x => x);
            setValores(data);
        });
    }, []);
    
    return(
      <>
      {/* Se recorre el arreglo dando formato a la informacion */}
      <ListGroup>
          
        {valores.map((v)=>
          <div class="mensageInBox">
            <h2 class="textMensage">{v.asunto} </h2> 
            <br></br>
            <p class="textMensage">{v.cuerpo}</p>
          </div>
        )}
      </ListGroup>
      </>
  )
}

//{v.fecha}