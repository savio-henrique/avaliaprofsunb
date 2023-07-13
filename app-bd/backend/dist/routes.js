"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserController_1 = __importDefault(require("./controllers/UserController"));
const body_parser_1 = __importDefault(require("body-parser"));
const routes = (0, express_1.Router)();
const UserCtr = UserController_1.default.getInstance();
//User Routes
routes.get('/users', UserCtr.index);
routes.post('/user', body_parser_1.default.json(), UserCtr.create);
routes.get('/user/:id', UserCtr.read);
routes.put('/user/:id', body_parser_1.default.json(), UserCtr.update);
routes.delete('/user/:id', body_parser_1.default.urlencoded({ extended: true }), UserCtr.delete);
//User Routes
exports.default = routes;
