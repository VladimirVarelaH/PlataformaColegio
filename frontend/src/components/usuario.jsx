import React, {useState, useEffect} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from "react-redux";
import "../style.css"
import {LoginForm} from "./loginform"
import {Table} from "react-bootstrap";
import { watch, setData } from '../redux/actions/usuariosActions.js';
import {Button} from "react-bootstrap";



export function Usuario(props){
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    const dispatch = useDispatch();
    const dataStored = useSelector((store)=> store.usuariosReducer.usuarioData);
    let data = {};

    const [rut, setRut] = useState("");
    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [tipo, setTipo] = useState('');
    const [cargo, setCargo] = useState();
    
    //Se trae la data del reducer
    const userDta = useSelector((store)=>store.usuariosReducer.usuarioData)

    
    const getInfoUsuario = () => {
        axios.get("http://localhost:8080/userserv/infoPersona", {
            params: { 
                rut: props.value,
            }
        }).then(res => {
            let data = res.data;
            data = Array.from(data, x => x);
            data.map( d => {
                console.log(d.rut);
                setRut(d.rut);
                data.rut = d.rut;
                console.log(d.nombres);
                setNombres(d.nombres);
                data.nombre = d.nombres;
                console.log(d.apellidos);
                setApellidos(d.apellidos);
                data.apellidos = d.apellidos;
                console.log(d.email);
                setEmail(d.email);
                data.email = d.email;
                console.log(d.tipoUsuario);
                setTipo(d.tipoUsuario.toString());
                for(let i=0 ; i<d.tipoUsuario.length ; i++){
                    if(d.tipoUsuario[i] == 'directivo'){
                        setCargo(d.cargoDirectivo);
                        data.directivo = d.cargoDirectivo;
                        console.log(data)
                        dispatch(setData(data));
                    }if (d.tipoUsuario[i] != 'directivo'){
                        delete data.directivo;
                        console.log(data);
                        dispatch(setData(data));
                    }
                }
            })
        }).catch((error)=>{
            userDta.map( d => {
                setRut(d.rut);
                setNombres(d.nombres);
                setApellidos(d.apellidos);
                setEmail(d.email);
                setTipo(d.tipoUsuario.toString());
                for(let i=0 ; i<d.tipoUsuario.length ; i++){
                    if(d.tipoUsuario[i] == 'directivo'){
                        setCargo(d.cargoDirectivo);
                        data.directivo = d.cargoDirectivo;
                        console.log(data)
                    }if (d.tipoUsuario[i] != 'directivo'){
                        delete data.directivo;
                        console.log(data);
                    }
                }
                console.log(error);
            });
        });
    
        }
    useEffect( getInfoUsuario, []);



    return isLogged ? (
        cargo ? (
            <section class="containerUser">
            <div className="bg-dark p-3" class="closeReader">
                <Button variant="danger" onClick={()=> dispatch(watch(false))}>X</Button>
            </div>
            <div class="userText">
                <strong>Nombre:</strong> <p>{nombres+' '+apellidos}</p>
                <strong>Rut: </strong> <p>{rut}</p>
                <strong>Email:</strong> <p>{email}</p>
                <strong>Tipo/s de Usuario: </strong> <p>{tipo}</p>
                <strong>Cargo: </strong><p>{cargo}</p>
            </div>
            <br></br>
            </section>
        ):(
            <section class="containerUser">
            <div className="bg-dark p-3" class="closeReader">
                <Button variant="danger" onClick={()=> dispatch(watch(false))}>X</Button>
            </div>
            <div class="userText">
                <strong>Nombre: </strong><p>{nombres+' '+apellidos}</p>
                <strong>Rut: </strong><p>{rut}</p> 
                <strong>Email: </strong> <p>{email}</p>
                <strong>Tipo/s de Usuario: </strong><p>{tipo}</p>
            </div>
            <br></br>
            </section>)
    ):(
    <>
        <LoginForm/>
    </>)  
}