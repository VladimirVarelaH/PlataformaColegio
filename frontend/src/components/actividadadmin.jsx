import React, {useState, useEffect} from 'react';
import axios from "axios";
import {useSelector, useDispatch} from "react-redux";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style.css";
import {ListGroup} from "react-bootstrap";

import { changeAdmin, changeEditing, exportProps, changeCreating,exportDeleteProps, changeDeleting } from '../redux/actions/actividadesActions.js';



export function ActividadAdmin(){
    //Variables de control de renderizado
    const dispatcher = useDispatch();
    const rut = useSelector((store => store.rutReducer.rut));
    let [valores, setValores] = useState([]);

    const getActivities = () => {
      axios.get("http://localhost:8080/actserv/getActivities", {
          params: {
              rut: rut,
              modo: 'creador'
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

    const deleteAct = (event)=>{
      //axios.delete("http://localhost:8080/actserv/delActividad/"+ id);
      const idDelete = (event.target.value);  //ahi te llega el id de la actividad
      const deleteProps = { id : idDelete};
      console.log(deleteProps);
      dispatcher(changeDeleting(true));
      dispatcher(exportDeleteProps(deleteProps))
      //la solicitud se hace en el componente que despliega
      
    }
    const updateAct = (event)=>{
      const id = (event.target.value);  //ahi te llega el id de la actividad
      //la solicitud se hace en el componente que despliega
      valores.map((a)=>{
        if(a.id == id){
            const propsEdit = {fecha: a.fecha, descripcion: a.descripcion, id : a.id}
            console.log(propsEdit);
            dispatcher(exportProps(propsEdit));
            dispatcher(changeAdmin(false));
            dispatcher(changeEditing(true));
            dispatcher(changeCreating(false));
        }
      });
      
    }

    return (
        <>
      {/* Se recorre el arreglo dando formato a la informacion */}
      <div class="asignHeader">
        <button class="asignCreateBtn" 
        onClick={()=>dispatcher(changeAdmin(false))}>
            Volver
        </button>
      </div>
      {valores.map((v)=>
        <ListGroup> 
          <div class="mensageInBox">
            <div class="asignTextSection">
              <h2 class="textMensage">{v.fecha} </h2> 
              <br></br>
              <p class="textMensage">{v.descripcion}</p>
            </div>
            <div class="asignButtonContainer"> 
              <button class="asignButton" onClick={updateAct} value={v.id}>Editar</button>
              <button class="asignButton" onClick={deleteAct} value={v.id}>Eliminar</button>
            </div>
          </div>
        </ListGroup>
      )}
      </>
    )
}