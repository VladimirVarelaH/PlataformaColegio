import './App.css';
import React from 'react';
import {LoginForm} from "./components/loginform.jsx"
import {NavBarBgrd} from "./components/navbar"
import {InBox} from "./components/inbox";
import {Asignaturas} from "./components/asignaturas.jsx"
import {Usuarios} from "./components/usuarios.jsx"
import { MiPerfil } from './components/miperfil.jsx';
import {Usuario} from "./components/usuario.jsx"
import {LogOut} from "./components/logout.jsx";
import {Container} from "react-bootstrap";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';
import {MensageReader} from "./components/mensageread";
import { InBoxActividades } from './components/actividadesinbox';

function App() {
  
  return (
    <Router>
      <div className="App">
        <NavBarBgrd/>
        <Switch>

          <Route path='/miperfil'>
            <Container>
              <MiPerfil/>
            </Container>
          </Route> 

          <Route path='/usuarios'>
            <Container>
              <Usuarios/>
            </Container>
          </Route>

          <Route path='/asignaturas'>
            <Container>
              <Asignaturas/>
            </Container>
          </Route>

          <Route path='/actividades'>
            <Container>
              <InBoxActividades/>
            </Container>
          </Route>

          <Route path='/mensajes'>
            <Container>
              <InBox/>
            </Container>
          </Route>

          <Route path='/salir'>
            <Container>
              <LogOut/>
            </Container>
          </Route>

          <Route path='/'>
            <Container>
              <LoginForm/>
            </Container>
          </Route>

        </Switch>
      </div>
    </Router>
  );
}

export default App;
