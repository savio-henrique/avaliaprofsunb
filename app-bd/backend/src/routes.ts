import { Router } from "express";
import UserController from "./controllers/UserController";
import bodyParser from "body-parser";

const routes = Router();

const UserCtr = UserController.getInstance()

//User Routes

routes.get('/users',UserCtr.index)
routes.post('/user',bodyParser.json(),UserCtr.create)
routes.get('/user/:id',UserCtr.read)
routes.put('/user/:id',bodyParser.json(),UserCtr.update)
routes.delete('/user/:id',bodyParser.urlencoded({extended : true}),UserCtr.delete)
routes.post('/auth',bodyParser.json(),UserCtr.auth)
//User Routes

export default routes;