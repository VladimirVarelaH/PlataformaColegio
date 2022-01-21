import React, {useState, useEffect} from 'react';
import axios from "axios";
import { useSelector, useDispatch } from 'react-redux';
import {login} from "../redux/actions/authActions.js"
import {defRut} from "../redux/actions/rutActions.js";
import {setPermisos, tipoDirectivo} from "../redux/actions/permisosAction.js"
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Alert } from "react-bootstrap";
import "../style.css"
import {InBox} from "./inbox";


export function LoginForm(props){
    const isLogged = useSelector((store => store.authReducer.isLogged));
    const dispatcher = useDispatch();

    const [rut, setRut] = useState("");
    const [password, setPassword] = useState("");
    const [estado, setEstado] = useState("");
   

    const handleRut = (event)=>{
        setRut(event.target.value);
    }
    const handlePass = (event)=>{
        setPassword(event.target.value);
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        axios.post("http://localhost:8080/userserv/login", {
            rut: rut,
            contrasenia: password,
        }).then((data)=>{
            console.log(data);
            setEstado("OK");
            dispatcher(login(true));
            dispatcher(defRut(rut));
            console.log(rut); //no sacar
            //console.log(data.data.tipoUsuario);
            dispatcher(setPermisos(data.data.tipoUsuario));
            data.data.tipoUsuario.map((v)=>{
                if(v == "directivo"){
                    //console.log(data.data.cargoDirectivo);
                    dispatcher(tipoDirectivo(data.data.cargoDirectivo));
                }
            })
            //console.log(data.data);
        }).catch((error)=>{
            setEstado("ERROR");
            alert(error);
        })
    }

    return isLogged ? (<InBox/>):
        (
        <div class="containerForm">
            <Form >
                <hr></hr>
                <Form.Group className="mb-3" controlId="formBasicEmail" inputForm>
                    <Form.Label class="auxiliarForm">RUT</Form.Label>
                    <Form.Control type="documento" placeholder="RUT sin numero verificador" 
                    onChange={handleRut}/>                    
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword" >
                    <Form.Label >Contraseña</Form.Label>
                    <Form.Control type="password" placeholder="Contraseña" onChange={handlePass}/>
                    <i class="formText">
                        Solicite su contraseña con el administrador.
                    </i> <br></br>
                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                    Enviar
                    </Button>
                </Form.Group>
                
                <hr></hr>
                
            </Form>
        </div>
    )
}

//mariwanda