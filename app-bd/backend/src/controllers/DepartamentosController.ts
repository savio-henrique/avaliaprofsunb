import connection from "../services/database";
import { Request, Response } from "express";
import { Connection } from "mysql2";

interface IDepto{
    codigo: Number,
    nome : string
} 

interface IDeptoController{
    list() : Promise<Array<IDepto>>;
    create(depto:IDepto) : Promise<boolean>;
    read(matricula:number) : Promise<IDepto>;
    update(depto:IDepto) : Promise<boolean>;
    delete(matricula:number) : Promise<boolean>;
}

class ControllerDepto implements IDeptoController{
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

    async list(): Promise<Array<IDepto>> {
        var final = new Array<IDepto>
        var sql = "SELECT * FROM `Departamentos`"

        await this.get_info(sql)
        .then((resultado) => {
            resultado.map((dados:any) => {
                var depto:IDepto = {
                    codigo: dados.pk_codigo,
                    nome: dados.str_nome
                }
                final.push(depto); 
            })
        })
        return final;
    } 

    async create(depto:IDepto): Promise<boolean> {
        var result = false;
        await this.use_query_data("INSERT INTO `Departamentos` VALUES(?,?)",
        [depto.codigo,depto.nome])
        .then(()=>{
            result = true;
        })
        .catch((error)=>{
            result = false
        })
        return result;
    }  

    async read(matricula:number): Promise<IDepto> {
        var depto:IDepto = {
            codigo : 0,
            nome: '',
        }
        var sql = "SELECT * FROM `Departamentos` WHERE `pk_codigo` = ?"

        await this.use_query_data(sql,[matricula])
        .then((result:Array<any>) => {
            if (result.length == 0) return
            var resultado = result[0] 
            
            depto = {
                codigo : resultado.pk_codigo,
                nome: resultado.str_nome
            }
        })
        return depto;
    }  

    async update(depto:IDepto): Promise<boolean> {
        var final = false;
        var sql = "UPDATE `Departamentos` SET `pk_codigo` = ?, `str_nome` = ? WHERE `pk_codigo` = ?"
        var values = [depto.codigo,depto.nome,depto.codigo]

        await this.use_query_data(sql,values)
        .then((result:Array<any>) => {
            final = true
        })

        return final
    }

    async delete(matricula:number): Promise<boolean> {
        var final = false
        var sql = "DELETE FROM `Departamentos` WHERE pk_codigo = ?"
        
        await this.use_query_data(sql,[matricula])
        .then ((result) =>{
            if (result.length != 0) return
            final = true
        })
        return final;
    }  

}

class DeptoRoutes{
    private static instance : DeptoRoutes
    private static controladora : IDeptoController

    private constructor(){
        DeptoRoutes.controladora = new ControllerDepto();
    }

    static getInstance():DeptoRoutes{
        if (this.instance == null){        
            this.instance = new DeptoRoutes();
        }
        return this.instance;
    }

    public async index(req : Request, res : Response){
        return res.json(await DeptoRoutes.controladora.list())
    }

    public async create(req:Request, res:Response){
        var resposta = req.body
        var depto:IDepto = {
            codigo : resposta.codigo,
            nome: resposta.nome
        }
        return res.send(await DeptoRoutes.controladora.create(depto));
    }

    public async read(req : Request, res: Response){
        var resposta = Number(req.params.id)
        return res.send(await DeptoRoutes.controladora.read(resposta))
    }

    public async update(req : Request, res: Response){
        var resposta = req.body
        var depto:IDepto = {
            codigo : resposta.codigo,
            nome: resposta.nome,
        }
        return res.send(await DeptoRoutes.controladora.update(depto))
    }

    public async delete(req: Request, res: Response){
        var resposta = Number(req.params.id)
        return res.send(await DeptoRoutes.controladora.delete(resposta))
    }
}

export default DeptoRoutes;
