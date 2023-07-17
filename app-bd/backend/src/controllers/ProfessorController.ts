import connection from "../services/database";
import { Request, Response } from "express";
import { Connection } from "mysql2";

interface IProf{
    matricula: number,
    nome: string,
    sobrenome: string,
    foto: Blob,
    departamento : number,
    status: boolean
} 

interface IProfController{
    list() : Promise<Array<IProf>>;
    create(prof:IProf) : Promise<boolean>;
    read(matricula:number) : Promise<IProf>;
    update(prof:IProf) : Promise<boolean>;
    delete(matricula:number) : Promise<boolean>;
}

class ControllerProf implements IProfController{
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

    async list(): Promise<Array<IProf>> {
        var final = new Array<IProf>
        var sql = "SELECT * FROM `Professores` WHERE `bo_status` IS NOT FALSE"

        await this.get_info(sql)
        .then((resultado) => {
            resultado.map((dados:any) => {
                var prof:IProf = {
                    matricula : dados.pk_matricula,
                    nome: dados.str_nome,
                    sobrenome: dados.str_sobrenome,
                    foto: dados.blob_foto,
                    departamento : dados.fk_departamento,
                    status: dados.bo_status
                }
                final.push(prof); 
            })
        })
        return final;
    } 

    async create(prof:IProf): Promise<boolean> {
        var result = false;
        await this.use_query_data("INSERT INTO `Professores` VALUES(?,?,?,?,?,?)",
        [prof.matricula,prof.nome,prof.sobrenome,prof.foto,prof.departamento,true])
        .then(()=>{
            result = true;
        })
        .catch((error)=>{
            result = false
        })
        return result;
    }  

    async read(matricula:number): Promise<IProf> {
        var prof:IProf = {
            matricula : 0,
            nome: '',
            sobrenome: '',
            foto: new Blob,
            departamento : 0,
            status: false
        }
        var sql = "SELECT * FROM `Professores` WHERE `pk_matricula` = ?"

        await this.use_query_data(sql,[matricula])
        .then((result:Array<any>) => {
            if (result.length == 0) return
            var resultado = result[0] 
            
            prof = {
                matricula : resultado.pk_matricula,
                nome: resultado.str_nome,
                sobrenome: resultado.str_sobrenome,
                foto: resultado.blob_foto,
                departamento:resultado.fk_departamento,
                status: resultado.bo_status
            }
        })
        return prof;
    }  

    async update(prof:IProf): Promise<boolean> {
        var final = false;
        var sql = "UPDATE `Professores` SET `pk_matricula` = ?,`str_nome` = ?,`str_sobrenome` = ?,`blob_foto` = ?,`fk_departamento` = ?,`bo_status` = ? WHERE `pk_matricula` = ?"
        var values = [prof.matricula,prof.nome,prof.sobrenome,prof.foto,prof.departamento,true,prof.matricula]

        await this.use_query_data(sql,values)
        .then((result:Array<any>) => {
            final = true
        })

        return final
    }

    async delete(matricula:number): Promise<boolean> {
        var final = false
        var sql = "DELETE FROM `Professores` WHERE pk_matricula = ?"
        
        await this.use_query_data(sql,[matricula])
        .then ((result) =>{
            if (result.length != 0) return
            final = true
        })
        return final;
    }  

}

class ProfRoutes{
    private static instance : ProfRoutes
    private static controladora : IProfController

    private constructor(){
        ProfRoutes.controladora = new ControllerProf();
    }

    static getInstance():ProfRoutes{
        if (this.instance == null){        
            this.instance = new ProfRoutes();
        }
        return this.instance;
    }

    public async index(req : Request, res : Response){
        return res.json(await ProfRoutes.controladora.list())
    }

    public async create(req:Request, res:Response){
        var resposta = req.body
        var prof:IProf = {
            matricula : resposta.matricula,
            nome: resposta.nome,
            sobrenome: resposta.sobrenome,
            foto: resposta.foto,
            departamento:resposta.departamento,
            status: true
        }
        return res.send(await ProfRoutes.controladora.create(prof));
    }

    public async read(req : Request, res: Response){
        var resposta = Number(req.params.id)
        return res.send(await ProfRoutes.controladora.read(resposta))
    }

    public async update(req : Request, res: Response){
        var resposta = req.body
        var prof:IProf = {
            matricula : resposta.matricula,
            nome: resposta.nome,
            sobrenome: resposta.sobrenome,
            foto: resposta.foto,
            departamento:resposta.departamento,
            status: true
        }
        return res.send(await ProfRoutes.controladora.update(prof))
    }

    public async delete(req: Request, res: Response){
        var resposta = Number(req.params.id)
        return res.send(await ProfRoutes.controladora.delete(resposta))
    }
}

export default ProfRoutes;
