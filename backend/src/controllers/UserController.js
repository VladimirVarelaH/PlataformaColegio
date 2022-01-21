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


export default class UserController {

    // Crear un usuario
    async createPerson(req, res) {
        try{
            console.log(req.body);
            // Valida el rut del usuario que se intenta crear
            const validate = await persona.findOne({ where: { rut:req.body.rut } });
            if (validate) return res.status(400).send("Ya existe un usuario con este rut");

            // Crea a la persona en la bd
            const newPersona = await persona.create({
                rut: req.body.rut,
                nombres: req.body.nombres,
                ap_paterno: req.body.ap_paterno,
                ap_materno: req.body.ap_materno,
                email: req.body.email,
                contrasenia: req.body.rut
            });

            if(req.body.directivo) {
                // busca el ID del cargo del directivo
                console.log(req.body.directivo.cargo);
                let dummyVar = [];
                let idCargo = 999;
                const infoCargos = await cargo.findAll();
                infoCargos.map((a) => dummyVar.push([a.id,a.cargo_p]));
                dummyVar.forEach( dato => {
                    if(dato[1] == req.body.directivo.cargo) idCargo = dato[0];
                });
                // crea una entrada en la tabla directivos
                try{
                    const newDirectivo = await directivo.create({
                        rut_directivo: req.body.rut,
                        id_cargo: idCargo
                    })
                    console.log("Directivo creado con el cargo: ", req.body.directivo.cargo );

                } catch(e) {
                    console.log("error al crear al directivo");
                }  
            };
            if(req.body.alumno) {
                console.log(req.body.alumno);
                // busca el ID del curso del alumno
                console.log(req.body.alumno.curso);
                let dummyVar = [];
                let idCurso = 999;
                const infoCursos = await curso.findAll();
                infoCursos.map((a) => dummyVar.push([a.id,a.nombre]));
                dummyVar.forEach( dato => {
                    if(dato[1] == req.body.alumno.curso) idCurso = dato[0];
                });
                // crea una entrada en la tabla alumnos
                try{
                    const newAlumno = await alumno.create({
                        rut_alumno: req.body.rut,
                        id_curso: idCurso
                    })
                    console.log("Alumno creado en el curso: ", req.body.alumno.curso );

                } catch(e) {
                    console.log("error al crear al alumno");
                }
            };
            if(req.body.profesor) {
                console.log(req.body.profesor);
                // busca el ID del curso al cual se imparte la asignatura que asumirá el profesor
                const infoCurso = await curso.findAll({where: { nombre: req.body.profesor.curso  }});
                let idCurso = infoCurso[0].id
                console.log(idCurso);
                // busca el ID de la asignatura del profesor
                // Mas adelante debera buscar el id de todas las asignaturas del profe
                let dummyVar = [];
                let idAsignatura = 999;
                const infoAsignaturas = await asignatura.findAll({where: { id_curso: idCurso },});
                infoAsignaturas.map((a) => dummyVar.push([a.id,a.nombre,a.id_curso]));
                dummyVar.forEach( dato => {
                    if(dato[1] == req.body.profesor.asignatura) idAsignatura = dato[0];
                });
                console.log(idAsignatura);
                // crea una entrada en la tabla profesores
                try{
                    const newProfesor = await profesor.create({
                        rut_profesor: req.body.rut,
                        id_asignatura: idAsignatura,

                    })
                    console.log("Profesor creado para la asignatura: ", req.body.profesor.asignatura );

                } catch(e) {
                    console.log("error al crear al profesor");
                }
            };
            if(req.body.profesorJefe) {
                console.log(req.body.profesorJefe);
                // busca el ID del curso del alumno
                console.log(req.body.profesorJefe.curso);
                let dummyVar = [];
                let idCurso = 999;
                const infoCursos = await curso.findAll();
                infoCursos.map((a) => dummyVar.push([a.id,a.nombre]));
                dummyVar.forEach( dato => {
                    if(dato[1] == req.body.profesorJefe.curso) idCurso = dato[0];
                });
                // crea una entrada en la tabla profesoresjefes
                try{
                    const newProfesorJefe = await profesorjefe.create({
                        rut_profesor_jefe: req.body.rut,
                        id_curso: idCurso
                    })
                    console.log("ProfesorJefe creado en el curso: ", req.body.profesorJefe.curso );

                } catch(e) {
                    console.log("error al crear al profesorJefe");
                }
            };
            if(req.body.apoderado) {
                console.log(req.body.apoderado);
                // verfica que exista algun alumno con el rut
                console.log(req.body.apoderado.rut_alumno);
                let dummyVar = [];
                let rutAlumno = 999;
                const infoAlumnos = await alumno.findAll({where: { rut_alumno: req.body.apoderado.rut_alumno }});
                if(infoAlumnos[0].rut_alumno) console.log(infoAlumnos[0].rut_alumno);
                // crea una entrada en la tabla apoderados
                try{
                    const newApoderado = await apoderado.create({
                        rut_apoderado: req.body.rut,
                        rut_alumno: req.body.apoderado.rut_alumno
                    })
                    console.log("Apoderado creado para el alumno: ", req.body.apoderado.rut_alumno );

                } catch(e) {
                    console.log("error al crear al Apoderado");
                }
            };    

            //Envia la respuesta de la peticion
            res.send('Persona creada');
        } catch (e){
            res.send(false);
            console.log("error");
        }
    }




    async getAll(req, res) {
        try{
            let respuesta = [];
            const personas = await persona.findAll();
            personas.map( p => {
                let rut = p.rut;
                let nombres = p.nombres;
                let apellidos = p.ap_paterno + ' ' + p.ap_materno;
                let email = p.email;
                let fila = {rut, nombres, apellidos, email};
                respuesta.push(fila);
            });
            res.send(respuesta);
        } catch (e){
            res.send(false);
            console.log(e);
            console.log("error al cargar a las personas");
        }
    }




    async validateUser(req, res) {
        try{
            console.log(req.body);
            // Se valida que el rut recibido exista y la contrasenia sea correcta.
            const validatePersona = await persona.findOne(
                { where: { rut: req.body.rut, contrasenia: req.body.contrasenia, } }
            );
            if (!validatePersona) return res.status(400).send("Rut no registrado");
            
            
            // Se determina que tipo de usuario es: (profesor, alumno, etc)   
            const isDirectivo = await directivo.findOne({ where: { rut_directivo:req.body.rut } });
            const isAlumno = await alumno.findOne({ where: { rut_alumno:req.body.rut } });
            const isProfesor = await profesor.findOne({ where: { rut_profesor:req.body.rut } });
            const isProfesorJefe = await profesorjefe.findOne({ where: { rut_profesor_jefe:req.body.rut } });
            const isApoderado = await apoderado.findOne({ where: { rut_apoderado:req.body.rut } });
            
            // Se realizan las agregaciones al arreglo tipoUsuario
            let tipoUsuario = [];

            let cargoDirectivo;
            if(isDirectivo) {
                tipoUsuario.push('directivo');
                if(isDirectivo.id_cargo){
                    const cargoTemp = await cargo.findOne({where: { id: isDirectivo.id_cargo }});
                    cargoDirectivo = cargoTemp.cargo_p;
                }           
            }
            if(isAlumno) tipoUsuario.push('alumno');
            if(isProfesor) tipoUsuario.push('profesor');
            if(isProfesorJefe) tipoUsuario.push('profesorJefe');
            if(isApoderado) tipoUsuario.push('apoderado');
            
            // Se envía la respuesta al cliente
            res.send({validationBool:'true',tipoUsuario:tipoUsuario,cargoDirectivo:cargoDirectivo});

        } catch (e){
            res.status(400).send("Rut no registrado");
            console.log("error");
        }
    }

   
    async getInfoByRut(req, res) {
        try {
            let respuesta = [];
            let rut, nombres, apellidos,email;
            let tipoUsuario = [];
            let cargoDirectivo;

            if (!req.query.rut)return res.status(400).send("Ya existe un usuario con este rut");

            // se obtiene la información básica de la persona y se almacena en variables
            const userInfo = await persona.findAll({
                where: {rut: req.query.rut}
            });
            userInfo.map( u => {
                rut = u.rut;
                nombres = u.nombres;
                apellidos = u.ap_paterno + ' ' + u.ap_materno;
                email = u.email;
            });

            // se obtiene el tipo de usuario de la persona
            const isDirectivo = await directivo.findOne({ where: { rut_directivo:rut } });
            const isAlumno = await alumno.findOne({ where: { rut_alumno:rut } });
            const isProfesor = await profesor.findOne({ where: { rut_profesor:rut } });
            const isProfesorJefe = await profesorjefe.findOne({ where: { rut_profesor_jefe:rut } });
            const isApoderado = await apoderado.findOne({ where: { rut_apoderado:rut } });
            // Se realizan las agregaciones al arreglo tipoUsuario
            if(isDirectivo) {
                tipoUsuario.push('directivo');
                if(isDirectivo.id_cargo){
                    const cargoTemp = await cargo.findOne({where: { id: isDirectivo.id_cargo }});
                    cargoDirectivo = cargoTemp.cargo_p;
                }           
            }
            if(isAlumno) tipoUsuario.push('alumno');
            if(isProfesor) tipoUsuario.push('profesor');
            if(isProfesorJefe) tipoUsuario.push('profesorJefe');
            if(isApoderado) tipoUsuario.push('apoderado');
            
            // Se empaquetan los datos del usuario en un json
            let datosPersonales = {rut, nombres, apellidos, email, tipoUsuario, cargoDirectivo};
            // Se incrustan dichos datos en el array de respuesta
            respuesta.push(datosPersonales);
            res.send(respuesta);
        } catch(e) {
            res.send('error al solicitar la info del usuario')
        }
       
    }
}