import React from 'react';
import { useSelector } from 'react-redux';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import {Navbar, Container } from "react-bootstrap";
import "../style.css"
import {NavBarButon} from "./navbutons.jsx";

export function NavBarBgrd(){
    const isLogged = useSelector((store => store.authReducer.isLogged));
    return(
        <div >
                <Navbar bg="dark" variant="dark" class="navBarContainer"  >
                    <Container>
                    <Navbar.Brand as={Link} to="/" href="#index">
                        MiColegio
                    </Navbar.Brand>
                    </Container>
                    {isLogged ? (<NavBarButon/>): (<div></div>)}
                    
                </Navbar>

        </div>
    )
}