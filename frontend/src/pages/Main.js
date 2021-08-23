import React from "react";
import "./Main.css"

import { MapContainer, TileLayer, Marker, Popup, Circle, useMap } from 'react-leaflet'

import 'leaflet/dist/leaflet.css';

import SideNav from "../components/SideNav";

import L from 'leaflet';

import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [24, 36],
    iconAnchor: [12, 36]
});

L.Marker.prototype.options.icon = DefaultIcon;

class Main extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            user: props.user,
            locationsArray: [],
            mapCenter: { lat: -15.793889, lng: -47.882778 },
        }
    }

    render() {
        return (
            <div className="main" style={{ gridTemplateColumns: this.state.locationsArray.length > 0 ? "33% 67%" : "10% 90%" }}>
                <SideNav user={this.state.user} setLocationsArray={(param) => this.setState({ locationsArray: param })} />
                <MapContainer className="map" center={{ lat: this.state.mapCenter.lat, lng: this.state.mapCenter.lng }} zoom={5} style={{ height: '100vh', width: "100%" }}>
                    <TileLayer
                        attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {this.state.locationsArray.map((data, i) => {
                        return (
                            <Marker key={i} position={[data.lat, data.lng]}>
                                <Popup>{data.name}<br />{data.runwaysQtd === 1 ? "Possui 1 pista" : "Possui " + data.runwaysQtd + " pistas"}</Popup>
                                <Circle center={{ lat: data.lat, lng: data.lng }} radius={5000} />
                            </Marker>
                        )
                    })}
                </MapContainer>
            </div>
        );
    }

}

export default Main