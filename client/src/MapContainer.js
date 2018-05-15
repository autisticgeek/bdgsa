import React, { Component } from "react";
import GoogleMapReact from 'google-map-react'

import { connect } from "react-redux";

class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0
        }
        this.onGeolocateError = this.onGeolocateError.bind(this);
        this.onGeolocateSuccess = this.onGeolocateSuccess.bind(this);
        this.geolocate = this.geolocate.bind(this)
    }
    onGeolocateSuccess(coordinates) {
        const { latitude, longitude } = coordinates.coords;
        console.log('Found coordinates: ', latitude, longitude);
        this.setState(() => {
            return {
                lat: latitude,
                lng: longitude
            };
        });
    }

    onGeolocateError(error) {
        console.warn(error.code, error.message);

        if (error.code === 1) {
            console.log("they said no")
        } else if (error.code === 2) {
            console.log("position unavailable")
        } else if (error.code === 3) {
            console.log("timeout")
        }
    }
    geolocate() {
        if (window.navigator && window.navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.onGeolocateSuccess, this.onGeolocateError);
        }
    }


    render() {
        console.log(this.state)
        return <div className='google-map'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAp_gcAL9g64umPJUNU10vjP3Y-MHbmmQo" }}
                    center={{ lat: 40.7, lng: -111.80 }}
                    zoom={9}>
                    <div lat={this.state.lat} lng={this.state.lng}>&mdot;</div>


                </GoogleMapReact><button onClick={this.geolocate}>Find ME</button>

            </div>
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, {})(Maps);