import mysql from 'mysql2';

const connection = mysql.createConnection({
    host : '172.20.0.2',
    user : 'root',
    password : 'bd',
    database : 'projeto_bd'
});

export default connection;