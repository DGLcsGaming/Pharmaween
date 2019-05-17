var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit: 100,
    host:'localhost', 
    user:'root',
    password:'08061997', 
    database:'pharmaciesshifts',
    port: 3306,
    debug: false,
    dateStrings : true
});
module.exports.connection = connection;