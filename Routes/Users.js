var express = require('express');
var users = express.Router();
var database = require('../Database/database');
var cors = require('cors')


users.use(cors());

function addPharmacy(){
    database.connection.getConnection(function(err, connection) {
        if (err) {
            console.log("ERROR conecting to database");
        } else {
            //var pharmacies = [{"pharName":"Pharmacie","pharCoor":{"lat":35.7986038,"lng":7.3922243}},{"pharName":"Pharmacie","pharCoor":{"lat":35.7978098,"lng":7.388632899999999}},{"pharName":"Pharmacie Belhamel","pharCoor":{"lat":35.800342,"lng":7.3897487}},{"pharName":"Pharmacie Hadjaj","pharCoor":{"lat":35.7961768,"lng":7.3905916}},{"pharName":"PHARMACIE BOUZIANI A/MALEK","pharCoor":{"lat":35.78623,"lng":7.391133}},{"pharName":"Pharmacie Berrah","pharCoor":{"lat":35.7963647,"lng":7.392344099999999}},{"pharName":"Paharmacie Bouaddis mostefa","pharCoor":{"lat":35.8008374,"lng":7.3921792}},{"pharName":"Pharmacie Boulakroune","pharCoor":{"lat":35.7942813,"lng":7.388410599999999}},{"pharName":"Pharmacie Bouhraoua","pharCoor":{"lat":35.7956843,"lng":7.3834214}},{"pharName":"Zaidi épouse Malaoui","pharCoor":{"lat":35.8030243,"lng":7.3859413}},{"pharName":"Pharmacie TOLBA Soumia Ep Boukeffa","pharCoor":{"lat":35.7798079,"lng":7.3736085}},{"pharName":"DS Santé","pharCoor":{"lat":35.796437,"lng":7.380185300000001}},{"pharName":"Green Parapharm","pharCoor":{"lat":35.7928318,"lng":7.3798128}},{"pharName":"zircone Medicale","pharCoor":{"lat":35.798588,"lng":7.3848034}},{"pharName":"Pharmacie Laribi","pharCoor":{"lat":35.7922702,"lng":7.3869552}},{"pharName":"Pharmacie Belambri","pharCoor":{"lat":35.7982905,"lng":7.3841489}},{"pharName":"Pharmacie Boudekhan","pharCoor":{"lat":35.7927186,"lng":7.3803302}},{"pharName":"Pharmacie Bouadis","pharCoor":{"lat":35.7954969,"lng":7.379505300000001}},{"pharName":"Pharmacie belhani salima","pharCoor":{"lat":35.8019583,"lng":7.400381999999999}},{"pharName":"Pharmacie Ghorab o","pharCoor":{"lat":35.79307379999999,"lng":7.3777002}}];
            var baladiyet = [[44,"Aïn Defla"],[44,"Aïn Bouyahia"],[44,"Aïn Defla"],[44,"Aïn Lechiekh"],[44,"Aïn Soltane"],[44,"Aïn Torki"],[44,"Arib"],[44,"Bathia"],[44,"Belaas"],[44,"Ben Allal"],[44,"Birbouche"],[44,"Bir Ould Khelifa"],[44,"Bordj Emir Khaled"],[44,"Boumedfaa"],[44,"Bourached"],[44,"Djelida"],[44,"Djemaa Ouled Cheikh"],[44,"Djendel"],[44,"El Abadia"],[44,"El Amra"],[44,"El Attaf"],[44,"El Hassania"],[44,"El Maine"],[44,"Hammam Righa"],[44,"Hoceinia"],[44,"Khemis Miliana"],[44,"Mekhatria"],[44,"Miliana"],[44,"Oued Chorfa"],[44,"Oued Djemaa"],[44,"Rouina"],[44,"Sidi Lakhdar"],[44,"Tacheta Zougagha"],[44,"Tarik Ibn Ziad"],[44,"Tiberkanine"],[44,"Zeddine"],[43,"Ahmed Rachedi"],[43,"Aïn Beida Harriche"],[43,"Aïn Mellouk"],[43,"Aïn Tine"],[43,"Amira Arrès"],[43,"Benyahia Abderrahmane"],[43,"Bouhatem"],[43,"Chelghoum Laid"],[43,"Chigara"],[43,"Derradji Bousselah"],[43,"El Mechira"],[43,"Elayadi Barbes"],[43,"Ferdjioua"],[43,"Grarem Gouga"],[43,"Hamala"],[43,"Mila"],[43,"Minar Zarza"],[43,"Oued Athmania"],[43,"Oued Endja"],[43,"Oued Seguen"],[43,"Ouled Khalouf"],[43,"Rouached"],[43,"Sidi Khelifa"],[43,"Sidi Merouane"],[43,"Tadjenanet"],[43,"Tassadane Haddada"],[43,"Teleghma"],[43,"Terrai Bainen"],[43,"Tessala Lemtaï"],[43,"Tiberguent"],[43,"Yahia Beni Guecha"],[43,"Zeghaia"],[46,"Aghlal"],[46,"Aïn El Arbaa"],[46,"Aïn Kihal"],[46,"Aïn Témouchent"],[46,"Aïn Tolba"],[46,"Aoubellil"],[46,"Beni Saf"],[46,"Bouzedjar"],[46,"Chaabat El Leham"],[46,"Chentouf"],[46,"El Amria"],[46,"El Emir Abdelkader"],[46,"El Malah"],[46,"El Messaid"],[46,"Hammam Bouhadjar"],[46,"Hassasna"],[46,"Hassi El Ghella"],[46,"Oued Berkeche"],[46,"Oued Sabah"],[46,"Ouled Boudjemaa"],[46,"Ouled Kihal"],[46,"Oulhaça El Gheraba"],[46,"Sidi Ben Adda"],[46,"Sidi Boumedienne"],[46,"Sidi Ouriache"],[46,"Sidi Safi"],[46,"Tamzoura"],[46,"Terga"]];
            connection.query('INSERT INTO city(stateId,name) VALUES ?', [baladiyet], function(err, UsersRows, fields) {
    if (err) {
        console.log("Error: "+err);
    } else {
        console.log("Added:");
    }
});
            connection.release();
        }
    });
}

// Usage Guide
users.get('/', function(req, res) {
    var appData = {};

    appData["error"] = 1;
    appData["data"] = "Usage: /pharmacies, /shifts";
    res.status(200).json(appData);
});

users.get('/pharmacies', function(req, res) {
    var appData = {};

    appData["error"] = 1;
    appData["data"] = "Usage: /pharmacies/state/<stateId>, /pharmacies/city/<cityId>";
    res.status(200).json(appData);
});

users.get('/shifts', function(req, res) {
    var appData = {};

    appData["error"] = 1;
    appData["data"] = "Usage: /shifts/today/city/<cityId>, /shifts/yesterday/city/<cityId>, /shifts/tomorrow/city/<cityId> | /shifts/today/state/<stateId>, /shifts/yesterday/state/<stateId>, /shifts/tomorrow/state/<stateId>, ";
    res.status(200).json(appData);
});

////Implementation
//Pharmacy Info
users.get('/pharmacy/:pharamcy?', function(req, res) {
    var appData = {};
    var pharmacy = req.params.pharmacy;
    if(pharmacy == null){
        appData["error"] = 1;
        appData["data"] = "pharmacyId is required, Usage: /pharmacy/<pharmacyId>";
        res.status(200).json(appData);
        return;
    }
    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Error connecting to the database, we will fix the problem shortly.";
            res.status(200).json(appData);
        } else {
            connection.query('SELECT pharmacy.name,pharmacy.lon,pharmacy.lat, pharmacy.image, city.name AS city, state.name AS state FROM pharmacy JOIN city ON city.id=pharmacy.cityId JOIN state ON state.code=city.stateCode WHERE pharmacy.id = ?', [pharmacy], function(err, PharmacyRows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = err;
                    res.status(200).json(appData);
                } else {
                    appData.error = 0;
                    var data = PharmacyRows;
                    appData["data"] = data;
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
    
});

//Pharmacies in an area
users.get('/pharmacies/state/:state?', function(req, res) {
    var appData = {};
    var state = req.params.state;
    if(state == null){
        appData["error"] = 1;
        appData["data"] = "stateId is required, Usage: /pharmacies/state/<stateId>";
        res.status(200).json(appData);
        return;
    }
    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Error connecting to the database, we will fix the problem shortly.";
            res.status(200).json(appData);
        } else {
            connection.query('SELECT pharmacy.name,pharmacy.lon,pharmacy.lat, pharmacy.image, city.name AS city, state.name AS state FROM pharmacy JOIN city ON city.id=pharmacy.cityId JOIN state ON state.code=city.stateCode WHERE state.code=?', [state], function(err, StateRows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = err;
                    res.status(200).json(appData);
                } else {
                    appData.error = 0;
                    var data = StateRows;
                    appData["data"] = data;
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
    
});

users.get('/pharmacies/city/:city?', function(req, res) {
    var appData = {};
    var city = req.params.city;
    if(city == null){
        appData["error"] = 1;
        appData["data"] = "cityId is required, Usage: /pharmacies/city/<cityId>";
        res.status(200).json(appData);
        return;
    }
    
    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Error connecting to the database, we will fix the problem shortly.";
            res.status(200).json(appData);
        } else {
            connection.query('SELECT pharmacy.name,pharmacy.lon,pharmacy.lat, pharmacy.image, city.name AS city, state.name AS state FROM pharmacy JOIN city ON city.id=pharmacy.cityId JOIN state ON state.code=city.stateCode WHERE city.id = ?', [city], function(err, CityRows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = err;
                    res.status(200).json(appData);
                } else {
                    appData.error = 0;
                    var data = CityRows;
                    appData["data"] = data;
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
    
});

//Shifts
users.get('/shifts/today/city/:city?', function(req, res) {
    var appData = {};
    var city = req.params.city;
    if(city == null){
        appData["error"] = 1;
        appData["data"] = "cityId is required, Usage: /shifts/today/city/<cityId>";
        res.status(200).json(appData);
        return;
    }
    
    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Error connecting to the database, we will fix the problem shortly.";
            res.status(200).json(appData);
        } else {
            connection.query('SELECT pharmacy.name AS Pharmacy, pharmacy.lon, pharmacy.lat, pharmacy.image, nightshift.date, city.name AS City, state.name AS State FROM pharmacy JOIN nightshift ON nightshift.pharmacyId=pharmacy.id JOIN city ON city.id=pharmacy.cityId JOIN state ON state.code=city.stateCode WHERE city.id = ? AND date=CURRENT_DATE()', [city], function(err, CityRows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = err;
                    res.status(200).json(appData);
                } else {
                    appData.error = 0;
                    var data = CityRows;
                    appData["data"] = data;
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
    
});

users.get('/shifts/yesterday/city/:city?', function(req, res) {
    var appData = {};
    var city = req.params.city;
    if(city == null){
        appData["error"] = 1;
        appData["data"] = "cityId is required, Usage: /shifts/yesterday/city/<cityId>";
        res.status(200).json(appData);
        return;
    }
    
    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Error connecting to the database, we will fix the problem shortly.";
            res.status(200).json(appData);
        } else {
            connection.query('SELECT pharmacy.name AS Pharmacy, pharmacy.lon, pharmacy.lat, pharmacy.image, nightshift.date, city.name AS City, state.name AS State FROM pharmacy JOIN nightshift ON nightshift.pharmacyId=pharmacy.id JOIN city ON city.id=pharmacy.cityId JOIN state ON state.code=city.stateCode WHERE city.id = ? AND date=CURRENT_DATE()-1', [city], function(err, CityRows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = err;
                    res.status(200).json(appData);
                } else {
                    appData.error = 0;
                    var data = CityRows;
                    appData["data"] = data;
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
    
});

users.get('/shifts/tomorrow/city/:city?', function(req, res) {
    var appData = {};
    var city = req.params.city;
    if(city == null){
        appData["error"] = 1;
        appData["data"] = "cityId is required, Usage: /shifts/tomorrow/city/<cityId>";
        res.status(200).json(appData);
        return;
    }
    
    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Error connecting to the database, we will fix the problem shortly.";
            res.status(200).json(appData);
        } else {
            connection.query('SELECT pharmacy.name AS Pharmacy, pharmacy.lon, pharmacy.lat, pharmacy.image, nightshift.date, city.name AS City, state.name AS State FROM pharmacy JOIN nightshift ON nightshift.pharmacyId=pharmacy.id JOIN city ON city.id=pharmacy.cityId JOIN state ON state.code=city.stateCode WHERE city.id = ? AND date=CURRENT_DATE()+1', [city], function(err, CityRows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = err;
                    res.status(200).json(appData);
                } else {
                    appData.error = 0;
                    var data = CityRows;
                    appData["data"] = data;
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
    
});

users.get('/shifts/today/state/:state?', function(req, res) {
    var appData = {};
    var state = req.params.state;
    if(state == null){
        appData["error"] = 1;
        appData["data"] = "stateId is required, Usage: /shifts/today/state/<stateId>";
        res.status(200).json(appData);
        return;
    }
    
    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Error connecting to the database, we will fix the problem shortly.";
            res.status(200).json(appData);
        } else {
            connection.query('SELECT pharmacy.name AS Pharmacy, pharmacy.lon, pharmacy.lat, pharmacy.image, nightshift.date, city.name AS City, state.name AS State FROM pharmacy JOIN nightshift ON nightshift.pharmacyId=pharmacy.id JOIN city ON city.id=pharmacy.cityId JOIN state ON state.code=city.stateCode WHERE state.id = ? AND date=CURRENT_DATE()', [state], function(err, StateRows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = err;
                    res.status(200).json(appData);
                } else {
                    appData.error = 0;
                    var data = StateRows;
                    appData["data"] = data;
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
    
});

users.get('/shifts/yesterday/state/:state?', function(req, res) {
    var appData = {};
    var state = req.params.state;
    if(state == null){
        appData["error"] = 1;
        appData["data"] = "stateId is required, Usage: /shifts/yesterday/state/<stateId>";
        res.status(200).json(appData);
        return;
    }
    
    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Error connecting to the database, we will fix the problem shortly.";
            res.status(200).json(appData);
        } else {
            connection.query('SELECT pharmacy.name AS Pharmacy, pharmacy.lon, pharmacy.lat, pharmacy.image, nightshift.date, city.name AS City, state.name AS State FROM pharmacy JOIN nightshift ON nightshift.pharmacyId=pharmacy.id JOIN city ON city.id=pharmacy.cityId JOIN state ON state.code=city.stateCode WHERE state.id = ? AND date=CURRENT_DATE()-1', [state], function(err, StateRows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = err;
                    res.status(200).json(appData);
                } else {
                    appData.error = 0;
                    var data = StateRows;
                    appData["data"] = data;
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
    
});

users.get('/shifts/tomorrow/state/:state?', function(req, res) {
    var appData = {};
    var state = req.params.state;
    if(state == null){
        appData["error"] = 1;
        appData["data"] = "stateId is required, Usage: /shifts/tomorrow/state/<stateId>";
        res.status(200).json(appData);
        return;
    }
    
    database.connection.getConnection(function(err, connection) {
        if (err) {
            appData["error"] = 1;
            appData["data"] = "Error connecting to the database, we will fix the problem shortly.";
            res.status(200).json(appData);
        } else {
            connection.query('SELECT pharmacy.name AS Pharmacy, pharmacy.lon, pharmacy.lat, pharmacy.image, nightshift.date, city.name AS City, state.name AS State FROM pharmacy JOIN nightshift ON nightshift.pharmacyId=pharmacy.id JOIN city ON city.id=pharmacy.cityId JOIN state ON state.code=city.stateCode WHERE state.id = ? AND date=CURRENT_DATE()+1', [state], function(err, StateRows, fields) {
                if (err) {
                    appData.error = 1;
                    appData["data"] = err;
                    res.status(200).json(appData);
                } else {
                    appData.error = 0;
                    var data = StateRows;
                    appData["data"] = data;
                    res.status(200).json(appData);
                }
            });
            connection.release();
        }
    });
    
});



module.exports = users;