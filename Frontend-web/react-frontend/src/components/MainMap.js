import React, { useContext, useEffect, useRef } from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import axios from "axios";
import "leaflet/dist/leaflet.css";
import Search from "./partial/Search";
import LocationPromptModal from "./partial/LocationPromptModal";
import LocateControl from "./partial/LocateControl";
import { GlobalStateContext } from "../GlobalState";

/* Leaflet change Default Icon START */
var iconWidth = 35;
var iconHeight = (82 / 50) * iconWidth;

var DefaultIcon = L.icon({
  iconUrl: require("../svg/map-marker.svg"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  iconSize: [iconWidth, iconHeight], // size of the icon
  shadowSize: [iconWidth, iconHeight], // size of the shadow
  iconAnchor: [iconWidth / 2, iconHeight], // point of the icon which will correspond to marker's location
  popupAnchor: [0, -iconHeight], // point from which the popup should open relative to the iconAnchor
  shadowAnchor: [iconWidth / 4, iconHeight]
});
L.Marker.prototype.options.icon = DefaultIcon;
/* Leaflet change Default Icon END */

const locateOptions = {
  position: "topleft",
  strings: {
    title: "الذهاب إلى مكان تواجدك",
    popup: '<strong class="arabic">أنت هنا!</strong>'
  },
  keepCurrentZoomLevel: true,
  flyTo: true,
  enableHighAccuracy: true,
  onActivate: () => {} // callback before engine starts retrieving locations
};

const MainMap = props => {
  const { mapState, setMapState } = useContext(GlobalStateContext);

  var map = useRef(null);
  useEffect(() => {
    navigator.permissions.query({ name: "geolocation" }).then(function(status) {
      switch (status.state) {
        case "prompt":
          setMapState(prevMapState => ({
            ...prevMapState,
            showLocationPrompt: true
          }));
          break;
        case "granted":
          setMapState(prevMapState => ({
            ...prevMapState,
            showLocationControl: true
          }));
          axios({
            method: "GET",
            responseType: "json",
            url: "http://localhost:3000/api/shifts/today/all",
            data: {}
          })
            .then(response => {
              if (response.data.error === 0 && response.data.data.length > 0) {
                setMapState(prevMapState => ({
                  ...prevMapState,
                  shifts: [...prevMapState.shifts, ...response.data.data]
                }));
              } else {
                console.log(response.data.data);
              }
            })
            .catch(error => {
              console.log(error);
            });
          break;
        case "denied":
          alert("DENIED");
          break;
        default:
          alert(status.state);
          break;
      }
    });
  }, []);

  const toggleLocationModal = () => {
    setMapState(prevMapState => ({
      ...prevMapState,
      showLocationPrompt: !prevMapState.showLocationPrompt
    }));
  };

  const onAcceptedlocationPermission = () => {
    toggleLocationModal();
    // Ask for permission by the browser
    setMapState(prevMapState => ({
      ...prevMapState,
      showLocationControl: true
    }));
  };

  const onLocationFound = e => {
    const { lat, lng } = e.latlng;
    setMapState(prevMapState => ({
      ...prevMapState,
      hasUserLocation: true,
      userLocation: {
        lat: lat,
        lon: lng
      }
    }));
  };
  return (
    <React.Fragment>
      <Map
        ref={map}
        center={
          mapState.hasUserLocation
            ? [mapState.userLocation.lat, mapState.userLocation.lon]
            : [36.7525, 3.04197]
        }
        zoom={15}>
        {mapState.showLocationControl === true && (
          <LocateControl
            options={locateOptions}
            onLocationFound={onLocationFound}
            startDirectly
          />
        )}

        <Search />
        <LocationPromptModal
          show={mapState.showLocationPrompt}
          toggle={toggleLocationModal}
          onAcceptedlocationPermission={onAcceptedlocationPermission}
        />

        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
        />

        {mapState.shifts.map(shift => (
          <Marker key={shift.shiftId} position={[shift.lat, shift.lon]}>
            <Popup>
              <div className="popup">
                <h5>
                  Pharamacy: <span id="pharamcyName">{shift.pharmacy} </span>
                </h5>
                <h5>
                  State: <span id="pharamcyState">{shift.state} </span>
                </h5>
                <h5>
                  City: <span id="pharamcyCity">{shift.city} </span>
                </h5>
                <h5>
                  Date: <span id="pharamcyDate">{shift.date}</span>
                </h5>
                <img id="pharmacyImg" alt="" src={shift.image} />
                <div id="navigationContainer">
                  <img id="navigationImg" alt="" src="/img/navigation.png" />
                  <a
                    id="pharamacyGoogleMapsLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    dir="rtl"
                    href={`https://www.google.com/maps/dir/?api=1&dir_action=navigate&destination=${
                      shift.lat
                    },${shift.lon}`}>
                    انقر هنا للتنقل باستخدام خرائط Google
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </Map>
    </React.Fragment>
  );
};

export default MainMap;
