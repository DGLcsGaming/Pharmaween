import { MapLayer } from "react-leaflet";
import L from "leaflet";
import { withLeaflet } from "react-leaflet";
import "leaflet-routing-machine/src";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";

class RoutingMachine extends MapLayer {
  setWaypoints({ from, to }) {
    this.leafletElement.getPlan().setWaypoints([L.latLng(from), L.latLng(to)]);
  }
  createLeafletElement() {
    const { map, road, updateRoad } = this.props;
    let leafletElement = L.Routing.control({
      waypoints: road,
      lineOptions: {
        styles: [
          {
            color: "#007bff",
            opacity: 0.8,
            weight: 6
          }
        ]
      },
      addWaypoints: true,
      draggableWaypoints: true,
      showAlternatives: true,
      routeWhileDragging: true,
      altLineOptions: {
        styles: [{ color: "#6c757d", opacity: 0.8, weight: 6 }]
      },
      createMarker: () => {
        return null;
      }
    }).addTo(map.current.leafletElement);
    return leafletElement.getPlan();
  }
}

export default withLeaflet(RoutingMachine);
