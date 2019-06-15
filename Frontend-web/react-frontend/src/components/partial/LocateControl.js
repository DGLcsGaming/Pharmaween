import { Component } from "react";
import { withLeaflet } from "react-leaflet";
import Locate from "leaflet.locatecontrol";

class LocateControl extends Component {
  componentDidMount() {
    const { options, startDirectly } = this.props;
    const { map } = this.props.leaflet;
    map.on("locationfound", this.props.onLocationFound);
    map.on("locationerror", this.props.onLocationError);

    const lc = new Locate(options);
    lc.addTo(map);
    if (startDirectly === true) {
      // request location update and set location
      lc.start();
    } else {
      lc.stop();
    }
  }

  render() {
    return null;
  }
}

export default withLeaflet(LocateControl);
