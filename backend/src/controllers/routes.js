import { response } from 'express';
import UserController from './UserController.js';
import MessageController from './MessageController.js';
import CourseController from './CourseController.js';
import AsignaturaController from './AsignaturaController.js'
import ActivitiesController from './ActivitiesController.js';

export default (app) => {


	//user admin service
	const userController = new UserController();
	app.post('/userserv/createPerson', userController.createPerson);
	app.get('/userserv/personas', userController.getAll);
	app.get('/userserv/infoPersona', userController.getInfoByRut);
	app.post('/userserv/login', userController.validateUser);

	//message service
	const messageController = new MessageController();
	app.post('/msgserv/sendMessage', messageController.registerMessages);
	app.get('/msgserv/mensajes', messageController.getMessages);

	//courses service
	const courseController = new CourseController();
	app.get('/courses/getCourses', courseController.getAllCourses);

	//asignatura service
	const asignaturaController = new AsignaturaController();
	app.post('/asignserv/create', asignaturaController.create);
	app.get('/asignserv/getAsignaturas', asignaturaController.getAllAsignaturas);
	app.put('/asignserv/updateAsignatura/:asignaturaId', asignaturaController.update);
	app.delete('/asignserv/delAsignatura/:asignaturaId', asignaturaController.delete);

	//actividades service
	const activitiesController = new ActivitiesController();
	app.post('/actserv/create', activitiesController.registerActivities);
	app.get('/actserv/getActivities', activitiesController.getActivities);
	app.put('/actserv/updateActividad/:id_actividad', activitiesController.update);
	app.delete('/actserv/delActividad/:id_actividad', activitiesController.delete);

};