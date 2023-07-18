import { Router } from "express";
import UserController from "./controllers/UserController";
import ProfessorController from "./controllers/ProfessorController";
import DeptoController from "./controllers/DepartamentosController";
import bodyParser from "body-parser";

const routes = Router();

const UserCtr = UserController.getInstance()
const ProfCtr = ProfessorController.getInstance()
const DeptoCtr = DeptoController.getInstance()

//User Routes

routes.get('/users',UserCtr.index)
routes.post('/user',bodyParser.json({limit:'10mb'}),UserCtr.create)
routes.get('/user/:id',UserCtr.read)
routes.put('/user/:id',bodyParser.json({limit:'10mb'}),UserCtr.update)
routes.delete('/user/:id',bodyParser.urlencoded({extended : true}),UserCtr.delete)
routes.post('/auth',bodyParser.json(),UserCtr.auth)
//User Routes

//Prof Routes
routes.get('/professors',ProfCtr.index)
routes.post('/professor',bodyParser.json({limit:'10mb'}),ProfCtr.create)
routes.get('/professor/:id',ProfCtr.read)
routes.put('/professor/:id',bodyParser.json({limit:'10mb'}),ProfCtr.update)
routes.delete('/professor/:id',bodyParser.urlencoded({extended : true}),ProfCtr.delete)
//Prof Routes

//Depto Routes
routes.get('/departments',DeptoCtr.index)
routes.post('/department',bodyParser.json({limit:'10mb'}),DeptoCtr.create)
routes.get('/department/:id',DeptoCtr.read)
routes.put('/department/:id',bodyParser.json({limit:'10mb'}),DeptoCtr.update)
routes.delete('/department/:id',bodyParser.urlencoded({extended : true}),DeptoCtr.delete)
//Depto Routes

// //Messages Routes
// routes.get('/ratings',DeptoCtr.index)
// routes.post('/rating',bodyParser.json({limit:'10mb'}),DeptoCtr.create)
// routes.get('/rating/:id',DeptoCtr.read)
// routes.put('/rating/:id',bodyParser.json({limit:'10mb'}),DeptoCtr.update)
// routes.delete('/rating/:id',bodyParser.urlencoded({extended : true}),DeptoCtr.delete)
// //Messages Routes

export default routes;