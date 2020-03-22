import GoogleMapReact from "google-map-react";
import React, { Component } from "react";

class Map extends Component {
  state = {
    center: [],
    zoom: 16
  };

  _onChange = ({ center, zoom }) => {
    this.setState({
      center: center,
      zoom: zoom
    });
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(position => {
      this.setState({
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      });
    });
  }

  render() {
    return (
      <div style={{ height: "100vh", width: "100%" }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyCeMKRU6Qp_26-4DBFRvWezcucCHeY9V-c" }}
          onChange={this._onChange}
          initialCenter={this.state.center}
          center={this.state.center}
          zoom={this.state.zoom}
        ></GoogleMapReact>
      </div>
    );
  }
}

export default Map;
