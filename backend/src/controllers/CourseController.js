import actividad from '../models/actividad.js';
import alumno from '../models/alumno.js';
import asignatura from '../models/asignatura.js';
import calificacion from '../models/calificacion.js';
import cargo from '../models/cargo.js';
import clase from '../models/clase.js';
import curso from '../models/curso.js';
import directivo from '../models/directivo.js';
import evaluacion from '../models/evaluacion.js';
import mensaje from '../models/mensaje.js';
import origendestino from '../models/origendestino.js';
import persona from '../models/persona.js';
import personaactividad from '../models/personaactividad.js';
import profesor from '../models/profesor.js';
import profesorjefe from '../models/profesorjefe.js';
import apoderado from '../models/apoderado.js';

export default class CourseController {

    // retorna todos los cursos de la bd
    async getAllCourses(req, res) {
        try{
            const cursos = await curso.findAll();
            res.send(cursos);
        } catch (e){
            res.send(e);
            console.log("error");
        }
   }
}
