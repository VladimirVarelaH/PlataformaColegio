/*
La vista del reader se implementara en una version 2, cuando haya mas seguridad 
sobre la estructura que retornara la API
*/

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../style.css"
//De Mensage se extraerá el contenido del mismo
import {Mensage} from "./mensage.jsx"
import {Button} from "react-bootstrap";

export function MensageReader (){
    return(
        <div class="backgroundReader">
            <div className="bg-dark p-3" class="closeReader">
                <Button variant="danger" >X</Button>
            
            </div>
        <div>
            <h2 class="textReader">Asunto</h2>
            <hr class="lineReader"></hr> 
        </div>
            <div class="bodyReader">
                <p class="textReader">Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, </p>
            </div>
        </div>
    )
}