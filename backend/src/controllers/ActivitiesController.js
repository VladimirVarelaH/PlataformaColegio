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


export default class ActivitiesController {
    



    // Crea una actividad en la bd y crea su registro en personaactividades
    async registerActivities(req, res) {
        try{
            console.log(req.body);
            let citados = [];
            if (req.body.tipo == 'Seleccionar'){
                return res.status(400).send("Debe seleccionar un tipo de grupo para citar");
            }
            else if(req.body.tipo == 'individual'){
                console.log('modo individual');
                citados = req.body.individual.rut_citados
                for(let i=0; i<citados.length;i++){
                    // Valida el rut del usuario citado a la actividad
                    let validateDestiny = await persona.findOne(
                        { where: { rut:citados[i] } }
                    );
                    console.log('persona validada');
                    if (!validateDestiny){
                        return res.status(400).send("Rut del citado numero: ", (i+1), " no encontrado");
                    }
                }
            }
            else if (req.body.tipo == 'todos'){
                console.log("modo todos");
                let allPersonas = await persona.findAll();
                allPersonas.map(fila => citados.push(fila.rut));

            }
            else if (req.body.tipo == 'curso'){
                console.log("modo curso");
                //busco y agrego los rut de los alumnos citados por el curso
                let rut_alumnos_citados = [];
                const alumnosCitados = await alumno.findAll({
                    where: { id_curso: req.body.curso_id }
                });
                alumnosCitados.map( fila => {
                    citados.push(fila.rut_alumno);
                    rut_alumnos_citados.push(fila.rut_alumno);
                });
                //busco y agrego a los apoderados de esos alumnos mediante sus rut
                let rut_apoderados_citados = [];
                const apoderadosCitados = await apoderado.findAll({
                    where: { rut_alumno: rut_alumnos_citados }
                });
                apoderadosCitados.map( fila => {
                    citados.push(fila.rut_apoderado);
                    rut_apoderados_citados.push(fila.rut_apoderado);
                })
                //busco y agrego el rut del profe a los citados mediante el curso
                let rut_profesor_jefe_var;
                const profesorJefeCitado = await profesorjefe.findOne({
                    where: { id_curso: req.body.curso_id}
                })
                rut_profesor_jefe_var = profesorJefeCitado.rut_profesor_jefe;
                citados.push(rut_profesor_jefe_var);
            }
            // Crea la actividad en la base de datos
            const activity = await actividad.create({
                fecha: req.body.fecha,
                descripcion: req.body.descripcion,
            });
            //Crea el registro de todos los citados a la actividad
            console.log(citados);
            for(let i=0; i<citados.length;i++){
                console.log("proceso de registro iniciado");
                let register = await personaactividad.create({
                    rut_creador: req.body.rut_creador,
                    rut_citado: citados[i],
                    id_actividad: activity.dataValues.id,
                });
                console.log("registro creado");
            }
            console.log("todos los registros creados");
            //Envia la respuesta de la peticion
            res.send('registros satisfactorios');
        } catch (e){
            res.send(false);
            console.log("error al crear la actividad");
        }
    }




    // retorna las actividades del usuario
    async getActivities(req, res) {
        try{
            let personaactividades;
            if(req.query.modo == 'citado'){
                personaactividades = await personaactividad.findAll({
                    where: { rut_citado: req.query.rut }
                })
            } else if(req.query.modo == 'creador'){
                personaactividades = await personaactividad.findAll({
                    where: { rut_creador: req.query.rut }
                })
            }
            let id_actividades = [];
            personaactividades.forEach( fila => id_actividades.push(fila.dataValues.id_actividad));    
            const actividades = await actividad.findAll({
                where: { id:id_actividades },
                order: [
                    ['id', 'DESC'],
                ],
            })
            res.send(actividades);
        } catch (e){
            res.send("error al leer las actividad");
            console.log(req.body);
            console.log("error al leer las actividad");
        }
    }




    // Actualiza/edita una actividad
    async update(req, res){
        try {
            console.log(req);
            const actividadUpdated = await actividad.findByPk(req.params.id_actividad);
            actividadUpdated.update({fecha: req.body.fecha, descripcion: req.body.descripcion });
            console.log(actividadUpdated.id, actividadUpdated.fecha, actividadUpdated.descripcion);
            res.send(actividadUpdated);
        } catch(e) {
            res.send(e);
            console.log('error al actualizar la actividad');
        } 
    }




    // elimina una actividad
    async delete(req, res){
        try {
            await personaactividad.destroy( { where: { id_actividad: req.params.id_actividad }})
            await actividad.destroy({where: {id: req.params.id_actividad}});
            res.send({status: "ok"});
        } catch(e) {
            res.send(e);
            console.log("error");
        }
        
    }
    
};