var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();
var path = require('path');
var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

var Routes = require('./Routes/Routes');

app.use('/api', Routes);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/views'));

// admin Views
app.get("/admin", function (req, res) {
    res.render('admin');
});

// Moderator Views
app.get("/moderator", function (req, res) {
    res.render('moderator');
});
app.get("/moderator-shifts", function (req, res) {
    res.render('moderator-shifts');
});
app.get("/moderator-pharmacies", function (req, res) {
    res.render('moderator-pharmacies');
});

// Login and Register Views
app.get("/login", function (req, res) {
    res.render('login');
});
app.get("/register", function (req, res) {
    res.render('register');
});

app.listen(port, function () {
    console.log("Server is running on port: " + port);
});