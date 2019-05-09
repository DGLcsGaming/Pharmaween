var mymap = L.map('mapid');

$.ajax({
    type: "GET",
    dataType: "json",
    url: "http://localhost:3000/shifts/today/city/54",
    success: function(res){
        var pharmacyName = res.data[0].pharmacy;
        var pharmacyLat = res.data[0].lat;
        var pharmacyLon = res.data[0].lon;
        var pharmacyImg = res.data[0].image;
        var pharmacyDate = res.data[0].date.slice(0, 10);
        var pharmacyCity = res.data[0].city;
        var pharmacyState = res.data[0].state;
        mymap.setView(L.latLng(pharmacyLat,pharmacyLon), 17);
        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(mymap);
        var marker = L.marker(L.latLng(pharmacyLat,pharmacyLon)).addTo(mymap);
        var pharamacyGoogleMapsLink = 'https://www.google.com/maps/dir/?api=1&dir_action=navigate&destination='+pharmacyLat+','+pharmacyLon;
        marker.bindPopup('<div id="popup">'+
            '<h5>Pharamacy: <span id="pharamcyName">'+pharmacyName+'</span></h5>'+
            '<h5>State: <span id="pharamcyState">'+pharmacyState+'</span></h5>'+
            '<h5>City: <span id="pharamcyCity">'+pharmacyCity+'</span></h5>'+
            '<h5>Date: <span id="pharamcyDate">'+pharmacyDate+'</span></h5>'+
            '<img id="pharmacyImg" src="'+pharmacyImg+'">'+
            '<div id="navigationContainer">'+
                '<img id="navigationImg" src="./navigation.png">'+
                '<a id="pharamacyGoogleMapsLink" target="_blank" href="'+pharamacyGoogleMapsLink+'">Click to navigate using Google Maps</a>'+
            '</div>'+
        '</div>');
    }
});