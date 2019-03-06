var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit: 100,
    host:'sql7.freesqldatabase.com', //212.24.96.173
    user:'sql7280539', //dglcsgaming
    password:'w2gXABHQPB', //08061997
    database:'sql7280539', //egybest
    port: 3306,
    debug: false,
    multipleStatements: true
});
module.exports.connection = connection;