"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = __importDefault(require("../services/database"));
const md5_1 = __importDefault(require("md5"));
const fs_1 = __importDefault(require("fs"));
class ControllerUser {
    constructor() {
        this.database = database_1.default;
    }
    get_info(sql) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield this.database.promise().query(sql);
            return result[0];
        });
    }
    use_query_data(sql, data) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = yield this.database.promise().query(sql, data);
            return result[0];
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            var final = new Array;
            var sql = "SELECT * FROM `Estudantes` WHERE `bo_status` IS NOT FALSE";
            yield this.get_info(sql)
                .then((resultado) => {
                resultado.map((dados) => {
                    var user = {
                        matricula: dados.pk_matricula,
                        email: dados.str_email,
                        nome: dados.str_nome,
                        sobrenome: dados.str_sobrenome,
                        curso: dados.fk_curso,
                        senha: dados.str_senha,
                        foto: dados.blob_foto,
                        status: dados.bo_status
                    };
                    final.push(user);
                });
            });
            return final;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            var result = false;
            var imgHex = fs_1.default.readFileSync('public/images/User-Profile-PNG.png').toString('hex');
            yield this.use_query_data("INSERT INTO `Estudantes` VALUES(?,?,?,?,?,?,?,?)", [user.matricula, user.email, user.nome, user.sobrenome, user.curso, user.senha, imgHex, true])
                .finally(() => {
                result = true;
            });
            return result;
        });
    }
    read(matricula) {
        return __awaiter(this, void 0, void 0, function* () {
            var user = {
                matricula: 0,
                email: '',
                nome: '',
                sobrenome: '',
                curso: '',
                senha: '',
                foto: new Blob,
                status: false
            };
            var sql = "SELECT * FROM `Estudantes` WHERE `pk_matricula` = ?";
            yield this.use_query_data(sql, [matricula])
                .then((result) => {
                if (result.length == 0)
                    return;
                var resultado = result[0];
                user = {
                    matricula: resultado.pk_matricula,
                    email: resultado.str_email,
                    nome: resultado.str_nome,
                    sobrenome: resultado.str_sobrenome,
                    curso: resultado.fk_curso,
                    senha: resultado.str_senha,
                    foto: resultado.blob_foto,
                    status: resultado.bo_status
                };
            });
            return user;
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            var final = false;
            var sql = "UPDATE `Estudantes` SET `pk_matricula` = ?,`str_email` = ? ,`str_nome` = ?,`str_sobrenome` = ?,`fk_curso` = ?,`str_senha` = ?,`blob_foto` = ?,`bo_status` = ? WHERE `pk_matricula` = ?";
            var values = [user.matricula, user.email, user.nome, user.sobrenome, user.curso, user.senha, user.foto, user.status, user.matricula];
            yield this.use_query_data(sql, values)
                .then((result) => {
                final = true;
            });
            return final;
        });
    }
    delete(matricula) {
        return __awaiter(this, void 0, void 0, function* () {
            var final = false;
            var sql = "DELETE FROM `Estudantes` WHERE pk_matricula = ?";
            yield this.use_query_data(sql, [matricula])
                .then((result) => {
                if (result.length != 0)
                    return;
                final = true;
            });
            return final;
        });
    }
    auth(matricula, senha) {
        return __awaiter(this, void 0, void 0, function* () {
            var final = false;
            return final;
        });
    }
}
class UserRoutes {
    constructor() {
        UserRoutes.controladora = new ControllerUser();
    }
    static getInstance() {
        if (this.instance == null) {
            this.instance = new UserRoutes();
        }
        return this.instance;
    }
    index(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            return res.json(yield UserRoutes.controladora.list());
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var resposta = req.body;
            var user = {
                matricula: resposta.matricula,
                email: resposta.email,
                nome: resposta.nome,
                sobrenome: resposta.sobrenome,
                curso: resposta.curso,
                senha: (0, md5_1.default)(resposta.senha),
                foto: new Blob,
                status: resposta.status
            };
            return res.send(yield UserRoutes.controladora.create(user));
        });
    }
    read(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var resposta = Number(req.params.id);
            return res.send(yield UserRoutes.controladora.read(resposta));
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var resposta = req.body;
            var user = {
                matricula: resposta.matricula,
                email: resposta.email,
                nome: resposta.nome,
                sobrenome: resposta.sobrenome,
                curso: resposta.curso,
                senha: resposta.senha,
                foto: resposta.foto,
                status: true
            };
            return res.send(yield UserRoutes.controladora.update(user));
        });
    }
    delete(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var resposta = Number(req.params.id);
            return res.send(yield UserRoutes.controladora.delete(resposta));
        });
    }
}
exports.default = UserRoutes;
