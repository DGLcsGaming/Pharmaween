var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var path = require('path');
var app = express();
var port = process.env.PORT || 3000; //hello

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

var Users = require('./Routes/Users');

app.use('/',Users);

/*app.use(express.static(__dirname + '/files'));

app.get("/login",function(req, res){
    res.status(200).sendFile(path.join(__dirname+'/files/login.html'));
});
app.get("/register",function(req, res){
    res.status(200).sendFile(path.join(__dirname+'/files/register.html'));
});
*/
app.listen(port,function(){
    console.log("Server is running on port: "+port);
});