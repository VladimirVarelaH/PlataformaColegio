import React, {useState, useEffect} from "react"
import axios from "axios";
import { useSelector } from "react-redux";
import { LoginForm } from "./loginform.jsx";


export function MiPerfil(){
    const rut = useSelector((store => store.rutReducer.rut));
    const isLogged = useSelector((store) => store.authReducer.isLogged);

    const [nombres, setNombres] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [email, setEmail] = useState('');
    const [tipo, setTipo] = useState('');
    const [cargo, setCargo] = useState();

    const getInfoUsuario = () => {
        axios.get("http://localhost:8080/userserv/infoPersona", {
            params: { 
                rut: rut,
            }
        }).then(res => {
            let data = res.data;
            data = Array.from(data, x => x);
            data.map( d => {
                setNombres(d.nombres);
                setApellidos(d.apellidos);
                setEmail(d.email);
                setTipo(d.tipoUsuario.toString());
                for(let i=0 ; i<d.tipoUsuario.length ; i++){
                    if(d.tipoUsuario[i] == 'directivo'){
                        setCargo(d.cargoDirectivo);
                    }
                }
            })
        })
    }
    useEffect( getInfoUsuario, []);

    return(
        isLogged ? (
            cargo ? (
                <section class="containerUser">
                
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
    );
}