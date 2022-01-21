import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Nav } from "react-bootstrap";
import "../style.css";
import { Link } from 'react-router-dom';
import {useSelector} from "react-redux";


export function NavBarButon(){
    const permisos = useSelector((store => store.permisosReducer.permisos));
    const cargo = useSelector((store => store.permisosReducer.tipoDirectivo));

    //crea una variable para manejar el renderizado del boton
    let autorizacion = false;
    //valida los permisos para definir si dar o no autorizacion
    permisos.map((permiso)=>{
        if (permiso == "directivo" && cargo=="admin"){
            autorizacion = true;
        }
    });

    return(
    <Nav className="me-auto">
        <Nav.Link as={Link} to="/miperfil" href="#miperfil">MiPerfil</Nav.Link>
        {
            autorizacion ? (
                <Nav.Link as={Link} to="/asignaturas" href="#asignaturas">Asignaturas</Nav.Link>
            ):(<div></div>)
        }
        <Nav.Link as={Link} to="/actividades" href="#actividades">Actividades</Nav.Link>
        <Nav.Link as={Link} to="/mensajes" href="#mensajes">Mensajes</Nav.Link>
        <Nav.Link as={Link} to="/usuarios" href="#usuarios">Usuarios</Nav.Link>
        <Nav.Link as={Link} to="/salir" href="#salir">Salir</Nav.Link>
    </Nav>
    )
}

