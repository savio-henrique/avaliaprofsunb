import connection from "../services/database";
import md5 from 'md5'
import { Request, Response } from "express";
import { Connection } from "mysql2";
import fs from 'fs';

interface IUser{
    matricula: number,
    email: string,
    nome: string,
    sobrenome: string,
    curso : string,
    senha: string,
    foto: Blob,
    status: boolean
} 

interface IUserController{
    list() : Promise<Array<IUser>>;
    create(user:IUser) : Promise<boolean>;
    read(matricula:number) : Promise<IUser>;
    update(user:IUser) : Promise<boolean>;
    delete(matricula:number) : Promise<boolean>;
    auth(matricula:number,senha:string): Promise<boolean>;

}

class ControllerUser implements IUserController{
    database: Connection

    constructor(){
        this.database = connection
    }

    private async get_info(sql:string):Promise<any>{
        var result = await this.database.promise().query(sql)
        return result[0]
    }

    private async use_query_data(sql:string,data:Array<any>):Promise<any>{
        var result = await this.database.promise().query(sql,data);
        return result[0]
    }

    async list(): Promise<Array<IUser>> {
        var final = new Array<IUser>
        var sql = "SELECT * FROM `Estudantes` WHERE `bo_status` IS NOT FALSE"

        await this.get_info(sql)
        .then((resultado) => {
            resultado.map((dados:any) => {
                var user:IUser = {
                    matricula : dados.pk_matricula,
                    email: dados.str_email,
                    nome: dados.str_nome,
                    sobrenome: dados.str_sobrenome,
                    curso: dados.fk_curso,
                    senha: dados.str_senha,
                    foto: dados.blob_foto,
                    status: dados.bo_status
                }
                final.push(user); 
            })
        })
        return final;
    } 

    async create(user:IUser): Promise<boolean> {
        var result = false;
        var imgHex = fs.readFileSync('public/images/User-Profile-PNG.png').toString('hex')
        await this.use_query_data("INSERT INTO `Estudantes` VALUES(?,?,?,?,?,?,?,?)",
        [user.matricula,user.email,user.nome,user.sobrenome,user.curso,user.senha,imgHex,true])
        .finally(()=>{
            result = true;
        })
        return result;
    }  

    async read(matricula:number): Promise<IUser> {
        var user:IUser = {
            matricula : 0,
            email: '',
            nome: '',
            sobrenome: '',
            curso: '',
            senha: '',
            foto: new Blob,
            status: false
        }
        var sql = "SELECT * FROM `Estudantes` WHERE `pk_matricula` = ?"

        await this.use_query_data(sql,[matricula])
        .then((result:Array<any>) => {
            if (result.length == 0) return
            var resultado = result[0] 
            
            user = {
                matricula : resultado.pk_matricula,
                email: resultado.str_email,
                nome: resultado.str_nome,
                sobrenome: resultado.str_sobrenome,
                curso: resultado.fk_curso,
                senha: resultado.str_senha,
                foto: resultado.blob_foto,
                status: resultado.bo_status
            }
        })
        return user;
    }  

    async update(user:IUser): Promise<boolean> {
        var final = false;
        var sql = "UPDATE `Estudantes` SET `pk_matricula` = ?,`str_email` = ? ,`str_nome` = ?,`str_sobrenome` = ?,`fk_curso` = ?,`str_senha` = ?,`blob_foto` = ?,`bo_status` = ? WHERE `pk_matricula` = ?"
        var values = [user.matricula,user.email,user.nome,user.sobrenome,user.curso,user.senha,user.foto,user.status,user.matricula]

        await this.use_query_data(sql,values)
        .then((result:Array<any>) => {
            final = true
        })

        return final
    }

    async delete(matricula:number): Promise<boolean> {
        var final = false
        var sql = "DELETE FROM `Estudantes` WHERE pk_matricula = ?"
        
        await this.use_query_data(sql,[matricula])
        .then ((result) =>{
            if (result.length != 0) return
            final = true
        })
        return final;
    }  

    async auth(matricula:number, senha:string):Promise<boolean> {
        var final = false;
        return final;
    }
}

class UserRoutes{
    static instance : UserRoutes
    static controladora : IUserController

    private constructor(){
        UserRoutes.controladora = new ControllerUser();
    }

    static getInstance():UserRoutes{
        if (this.instance == null){        
            this.instance = new UserRoutes();
        }
        return this.instance;
    }

    public async index(req : Request, res : Response){
        return res.json(await UserRoutes.controladora.list())
    }

    public async create(req:Request, res:Response){
        var resposta = req.body
        var user:IUser = {
            matricula : resposta.matricula,
            email: resposta.email,
            nome: resposta.nome,
            sobrenome: resposta.sobrenome,
            curso: resposta.curso,
            senha: md5(resposta.senha),
            foto: new Blob,
            status: resposta.status
        }
        return res.send(await UserRoutes.controladora.create(user));
    }

    public async read(req : Request, res: Response){
        var resposta = Number(req.params.id)
        return res.send(await UserRoutes.controladora.read(resposta))
    }

    public async update(req : Request, res: Response){
        var resposta = req.body
        var user:IUser = {
            matricula : resposta.matricula,
            email: resposta.email,
            nome: resposta.nome,
            sobrenome: resposta.sobrenome,
            curso: resposta.curso,
            senha: resposta.senha,
            foto: resposta.foto,
            status: true
        }
        return res.send(await UserRoutes.controladora.update(user))
    }

    public async delete(req: Request, res: Response){
        var resposta = Number(req.params.id)
        return res.send(await UserRoutes.controladora.delete(resposta))
    }
}

export default UserRoutes;