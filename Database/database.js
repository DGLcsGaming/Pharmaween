var mysql = require('mysql');

var connection = mysql.createPool({
    connectionLimit: 100,
    host:'localhost', //mysql6001.site4now.net
    user:'root', //a463d0_pharma
    password:'08061997', //fawri1997
    database:'pharmaciesshifts', //db_a463d0_pharma
    port: 3306,
    debug: false,
    multipleStatements: true
});
module.exports.connection = connection;