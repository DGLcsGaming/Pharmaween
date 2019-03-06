var express = require('express');
var users = express.Router();
var database = require('../Database/database');
var cors = require('cors')


users.use(cors());


users.get('/login', function(req, res) {
    var appData = {};
    var email = req.body.email || req.query.email;
    var password = req.body.password || req.query.password;
    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "خطأ في الإتصال بقاعدة البيانات, سنقوم بحل المشكلة قريبا, نعتذر على الإزعاج";
            res.status(200).json(appData);
        } else {
            connection.query('SELECT * FROM users WHERE email = ?', [email], function(err, UsersRows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = "حدث خطأ أثناء عملية تسجيل الدخول";
                    res.status(200).json(appData);
                } else {
                    appData.error = 0;
                    appData["data"] = "Logged in sucessfully";
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
});

module.exports = users;