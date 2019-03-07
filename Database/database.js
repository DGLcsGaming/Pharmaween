var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit: 100,
    host:'mysql6001.site4now.net', //212.24.96.173
    user:'a463d0_pharma', //dglcsgaming
    password:'fawri1997', //08061997
    database:'db_a463d0_pharma', //egybest
    port: 3306,
    debug: false,
    multipleStatements: true
});
module.exports.connection = connection;