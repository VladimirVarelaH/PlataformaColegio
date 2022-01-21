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

export default class AsignaturaController {
    // crea una asignatura
    async create(req, res) {
        try{
            // Se requiere que el nombre de la asignatura y el curso en que se imparte no exista en la bd.
            const searchCoincidence = await asignatura.findOne(
                { where: { id_curso: req.body.id_curso, nombre:req.body.nombre } }
            );
            if (searchCoincidence) return res.status(400).send("asignatura ya inscrita");
            // Crea la asignatura en la base de datos
            const asignaturaSearched = await asignatura.create({
                id_curso: req.body.id_curso,
                nombre: req.body.nombre,
            });
            //Envia la confirmacion de la peticion
            res.send(true);
        } catch (e){
            res.send(false);
            console.log(req.body);
            console.log("error");
        }
    }

    // retorna las asignaturas existentes
    async getAllAsignaturas(req, res) {
        try{
            let enviable = [];
            const asignaturas = await asignatura.findAll({
                order: [
                    ['nombre', 'ASC'],
                    ['id', 'DESC'],
                ],
            })
            const cursos = await curso.findAll()
            asignaturas.map(a => {
                cursos.map(c => {
                    if(a.id_curso == c.id){
                        enviable.push({ 
                            "id"    : a.id,
                            "curso"  : c.nombre,
                            "id_curso": a.id_curso,
                            "nombre"    : a.nombre 
                        });
                    }; 
                });
            });
            console.log(enviable);
            res.send(enviable);
        } catch (e){
            res.send(e);
            console.log("error");
        }
    }

    // actualiza una asignatura
    async update(req, res) {
        try {
            // Se requiere que el nombre de la asignatura, el anio  y el curso en que se imparte no exista en la bd.
            const searchCoincidence = await asignatura.findOne(
                { where: { id_curso: req.body.id_curso, nombre:req.body.nombre } }
            );
            if (searchCoincidence) return res.status(400).send("asignatura ya inscrita");
            const asignaturaUpdated = await asignatura.findByPk(req.params.asignaturaId);
            asignaturaUpdated.update({id_curso: req.body.id_curso, nombre: req.body.nombre });
            console.log(asignaturaUpdated);
            res.send(asignaturaUpdated);
        } catch(e) {
            res.send(e);
            console.log('error');
        }     
    }

    // elimina una asignatura
    async delete(req, res){
        try {
            //await asignatura.destroy({where: {id: req.data.id_asignatura}});
            await asignatura.destroy({where: {id: req.params.asignaturaId}});
            console.error();
            console.log(req);
            res.send({status: "ok"});
        } catch(e) {
            res.send(e);
            console.log("error");
        }
    }
}