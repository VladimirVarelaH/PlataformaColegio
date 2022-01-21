import React, {useState, useEffect} from 'react';
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import {useSelector, useDispatch} from "react-redux";
import "../style.css"
import {LoginForm} from "./loginform"
import {Table} from "react-bootstrap";
import { watch, setData } from '../redux/actions/usuariosActions.js';
import {Usuario} from "./usuario.jsx"




export function Usuarios(value){
    // Veo si el usuario está logueado, si está viendo a un usuario y cuál es su rut
    const isLogged = useSelector((store) => store.authReducer.isLogged);
    const isWatching = useSelector((store => store.usuariosReducer.isWatching));
    

    const dispatcher = useDispatch();

    const [usuarios, setUsuarios] = useState([]);
    const [rutToOpen, setRutToOpen] = useState('');

    const getUsuarios = () => {
        axios.get("http://localhost:8080/userserv/personas")
        .then(res => {
            let data = res.data;
            data = Array.from(data, x => x);
            setUsuarios(data);
            console.log(usuarios);
        });
    }

    useEffect( getUsuarios, []);

    const handleRutToOpen = (event)=>{
        setRutToOpen(event.target.value);
        dispatcher(setData(rutToOpen));
        
        dispatcher(watch(true));
      }

    return isLogged ?(
            isWatching ? (
                <>
                <Usuario value={rutToOpen}/>
                </>
            ):(
                <>
                <br/><br/>
                <Table striped bordered hover variant="dark">
                <thead>
                    <tr>
                    <th>Nombres</th>
                    <th>Apellidos</th>
                    <th>email</th>
                    <th>Desplegable</th>
                    </tr>
                </thead>
                {usuarios.map(u => 
                    <tbody>
                        <tr>
                        <td>{u.nombres}</td>
                        <td>{u.apellidos}</td>
                        <td>{u.email}</td>
                        <td>
                            <button class="asignButton" onClick={handleRutToOpen} value={u.rut}>Ver</button>
                        </td>
                        </tr>
                    </tbody>
                )}
                </Table>
                </>
            )
    ):(<LoginForm/>)  
}


/* Administracion */
//import {Button } from "react-bootstrap";
/* 
mas o menos lo mismo que los mensajes, se renderiza al decir en el filtro que tipo
de usuario se quiere visualizar

profesor:
| nombre | apellido | rut | tipo de usuario | asignatura | delete/edit |

directivo:
| nombre | apellido | rut | tipo de usuario | tipo de directivo | delete/edit |

profesores jefe:
| nombre | apellido | rut | tipo de usuario | curso a cargo | delete/edit |

alumno:
| nombre | apellido | rut | tipo de usuario | curso | delete/edit |
*/