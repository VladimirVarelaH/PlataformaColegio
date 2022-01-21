import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useSelector} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style.css";
import {ListGroup} from "react-bootstrap";

export function Actividad(){
    const rut = useSelector((store => store.rutReducer.rut));
    let [valores, setValores] = useState([]);

    const getActivities = () => {
      axios.get("http://localhost:8080/actserv/getActivities", {
          params: {
              rut: rut,
              modo: 'citado'
          }
      })
      .then(res => {
          let data = res.data;
          data = Array.from(data, x => x);
          setValores(data);
          console.log(data);
      });
    }
    useEffect( getActivities, []);

    return (
        <>
      {/* Se recorre el arreglo dando formato a la informacion */}
      
      {valores.map((v)=>
        <ListGroup> 
          <div class="mensageInBox">
            <div class="asignTextSection">
              <h2 class="textMensage">{v.fecha} </h2> 
              <br></br>
              <p class="textMensage">{v.descripcion}</p>
            </div>
            
          </div>
        </ListGroup>
      )}
      </>
    )
}