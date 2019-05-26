import React from "react";
import "./css/App.css";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false,
      shifts: {
        city: null,
        date: null,
        image: null,
        lat: 12,
        lon: 12,
        pharmacy: null,
        state: null
      }
    };
  }
  componentDidMount() {
    axios({
      method: "GET",
      responseType: "json",
      url: "http://localhost:3000/api/shifts/today/city/54",
      data: {}
    })
      .then(response => {
        if (response.status === 200) {
          if (response.data.error === 0 && response.data.data.length > 0) {
            this.setState({
              shifts: response.data.data[0]
            });
          } else {
            console.log(response.data.data);
          }
        } else
          console.log(
            `ERROR CODE (${response.status}): ${response.statusText}`
          );
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    var pharamacyGoogleMapsLink = `https://www.google.com/maps/dir/?api=1&dir_action=navigate&destination=${
      this.state.shifts.lat
    },${this.state.shifts.lon}`;
    return (
      <div className="App">
        <h1>hello</h1>
        <Map center={[this.state.shifts.lat, this.state.shifts.lon]} zoom={17}>
          <TileLayer
            attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png"
          />
          <Marker position={[this.state.shifts.lat, this.state.shifts.lon]}>
            <Popup>
              <div id="popup">
                <h5>
                  Pharamacy:{" "}
                  <span id="pharamcyName">{this.state.shifts.pharmacy} </span>
                </h5>
                <h5>
                  State:{" "}
                  <span id="pharamcyState">{this.state.shifts.state} </span>
                </h5>
                <h5>
                  City: <span id="pharamcyCity">{this.state.shifts.city} </span>
                </h5>
                <h5>
                  Date: <span id="pharamcyDate">{this.state.shifts.date}</span>
                </h5>
                <img id="pharmacyImg" alt="" src={this.state.shifts.image} />
                <div id="navigationContainer">
                  <img id="navigationImg" alt="" src="/img/navigation.png" />
                  <a
                    id="pharamacyGoogleMapsLink"
                    target="_blank"
                    rel="noopener noreferrer"
                    href={pharamacyGoogleMapsLink}>
                    Click to navigate using Google Maps
                  </a>
                </div>
              </div>
            </Popup>
          </Marker>
        </Map>
      </div>
    );
  }
}

export default App;
