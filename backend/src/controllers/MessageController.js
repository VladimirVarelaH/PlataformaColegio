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

export default class MessageController {
    



    // Crea un mensaje en la bd y crea su registro en origendestino
    async registerMessages(req, res) {
        try{
            console.log(req.body);
            let destinatarios = [];
            if (req.body.tipo == 'Seleccionar'){
                return res.status(400).send("Debe seleccionar un tipo de grupo para citar");
            }
            else if(req.body.tipo == 'individual'){
                console.log('modo individual');
                destinatarios = req.body.individual.rut_receptores;
                console.log(destinatarios);
                for(let i=0; i<destinatarios.length;i++){
                    // Valida el rut del usuario destinatario del mensaje
                    console.log(destinatarios[i]);
                    let validateDestiny = await persona.findOne(
                        { where: { rut:destinatarios[i] } }
                    );
                    if (!validateDestiny){
                        return res.status(400).send("Rut del destinatario numero: ", (i+1), " no encontrado");
                    }
                    console.log('persona validada');
                }
            }
            else if (req.body.tipo == 'todos'){
                console.log("modo todos");
                let allPersonas = await persona.findAll();
                allPersonas.map(fila => destinatarios.push(fila.rut));
            }
            else if (req.body.tipo == 'curso'){
                console.log("modo curso");
                //busco y agrego los rut de los alumnos destinatarios por el curso
                let rut_alumnos_destinatarios = [];
                const alumnosDestinatarios = await alumno.findAll({
                    where: { id_curso: req.body.curso_id }
                });
                alumnosDestinatarios.map( fila => {
                    destinatarios.push(fila.rut_alumno);
                    rut_alumnos_destinatarios.push(fila.rut_alumno);
                });
                //busco y agrego a los apoderados de esos alumnos mediante sus rut
                let rut_apoderados_destinatarios = [];
                const apoderadosDestinatarios = await apoderado.findAll({
                    where: { rut_alumno: rut_alumnos_destinatarios }
                });
                apoderadosDestinatarios.map( fila => {
                    destinatarios.push(fila.rut_apoderado);
                    rut_apoderados_destinatarios.push(fila.rut_apoderado);
                })
                //busco y agrego el rut del profe a los destinatarios mediante el curso
                let rut_profesor_jefe_var;
                const ProfesorJefeDestinatario = await profesorjefe.findOne({
                    where: { id_curso: req.body.curso_id}
                })
                rut_profesor_jefe_var = ProfesorJefeDestinatario.rut_profesor_jefe;
                destinatarios.push(rut_profesor_jefe_var);
            }
            // Crea el mensaje en la base de datos
            console.log('inicia creacion del mensaje');
            const message = await mensaje.create({
                asunto: req.body.asunto,
                cuerpo: req.body.cuerpo,
            });
            console.log('mensaje creado');

            //Crea el registro del emisor y receptor del mensaje     
            console.log(destinatarios);
            for(let i=0; i<destinatarios.length;i++){
                console.log("proceso de registro iniciado");
                const register = await origendestino.create({
                    rut_emisor: req.body.rut_emisor,
                    rut_receptor: destinatarios[i],
                    id_mensaje: message.dataValues.id,
                })
            }
            console.log("todos los registros creados");
            //Envia la respuesta de la peticion
            res.send('registros satisfactorios');
        } catch (e){
            res.send(false);
            console.log("error al crear el mensaje");
        }
    }




    // retorna los mensajes del usuario
    async getMessages(req, res) {
        try{
            const origendestinos = await origendestino.findAll({
                where: { rut_receptor: req.query.rut }
            })
            let id_mensajes = [];
            origendestinos.forEach(origendestino => id_mensajes.push(origendestino.dataValues.id_mensaje));    
            const mensajes = await mensaje.findAll({
                where: { id:id_mensajes },
                order: [
                    ['id', 'DESC'],
                ],
            })
            res.send(mensajes);
        } catch (e){
            res.send(e);
            console.log("error en la busqueda de mensajes");
        }
    }  
};