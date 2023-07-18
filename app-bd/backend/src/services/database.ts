import mysql from 'mysql2';

// run on docker mysql container
//ALTER USER 'root'@'%' IDENTIFIED WITH mysql_native_password BY 'bd'


const connection = mysql.createConnection({
    host : '172.18.0.2',
    user : 'root',
    password : 'bd',
    database : 'projeto_bd'
});

export default connection;