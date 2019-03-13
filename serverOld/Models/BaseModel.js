var mysql = require("mysql");

class BaseModel {
    constructor(table) {
        this.table = table;
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '123456',
            database: 'node'
        });
        this.connection.connect();
    }

    find(id) {
        let select =`SELECT * FROM ${this.table} WHERE id = ${id}`;
        return new Promise((resolve, reject) =>{
            this.connection.query(select, function(error, result, c) {
                if (error) reject(error);
                resolve(result[0]);
            })
        })
    }

    where(column, data) {
        let select =`SELECT * FROM ${this.table} WHERE ${column} = '${data}'`;
        return new Promise((resolve, reject) =>{
            this.connection.query(select, function(error, result, c) {
                if (error) reject(error);
                resolve(result);
            })
        })
    }

    query(select) {
        return new Promise((resolve, reject) =>{
            this.connection.query(`${select}`, function(error, result, c) {
                if (error) reject(error);
                resolve(result);
            })
        })
    }

    findAll(){
        let select =`SELECT * FROM ${this.table}`;
        return new Promise((resolve, reject) =>{
            this.connection.query(select, function(error, result, c) {
            if (error) reject(error);
            resolve(result);
            })
        })
    }

    findAllWithout (id, column) {
        let select =  `SELECT * FROM ${this.table} WHERE ${column} != '${id}'`;
        return new Promise((resolve, reject) => {
            this.connection.query(select, (err, result) => {
               if(err) reject(err);
               resolve(result);
            });
        })
    }

    findOr (data, first, second) {
        let select = `SELECT * FROM ${this.table} WHERE ${first} like '%${data}%' OR ${second} like '%${data}%'`;
        return new Promise((resolve, reject) => {
            this.connection.query(select, (err, result) => {
                if(err) reject(err);
                resolve(result);
            })
        })
    }

    add(obj){
        let keys = Object.keys(obj).join(",");
        let val = Object.values(obj).join("','");
        let insert = `Insert INTO ${this.table}( ${keys} ) values ('${val}')`;
        return new Promise((resolve, reject) => {
            this.connection.query(insert, function (error, result, c) {
            if (error) reject(error);
            resolve(result);
            })
        })
    }

    checkEmail(email) {
        let query = `SELECT email FROM ${this.table} WHERE email = '${email}'`;
        return new Promise((resolve, reject) => {
            this.connection.query(query, function (error, result) {
                if(error) reject(error);
                else if(result != "") {
                    resolve(1);
                }
                else{
                    resolve(0);
                }
            })
        });
    }
}

module.exports = BaseModel;
