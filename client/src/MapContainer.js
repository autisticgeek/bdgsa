import React, { Component } from "react";
import GoogleMapReact from 'google-map-react'
import axios from "axios"

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
    onGeolocateSuccess = (coordinates) =>{
        const { latitude, longitude } = coordinates.coords;
        console.log('Found coordinates: ', latitude, longitude);
        this.setState(() => {
            return {
                lat: latitude,
                lng: longitude
            };
        });
    }

    onGeolocateError= (error) => {
        console.warn(error.code, error.message);

        if (error.code === 1) {
            console.log("they said no")
        } else if (error.code === 2) {
            console.log("position unavailable")
        } else if (error.code === 3) {
            console.log("timeout")
        }
    }
    geolocate= () => {
        if (window.navigator && window.navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.onGeolocateSuccess, this.onGeolocateError);
        }
    }
   getSales = ()=> {
        axios.get(`/sales`).then(responce => {
            console.log(responce.data)
        })
    }
    componentDidMount() {
        this.geolocate();
    }


    render() {
        console.log("props", this.props)


        //let sales = [{lat:40.7, lng:-111.887}, {lat:40.5, lng:-111.8}, {lat:-1.1745995, lng:116.7016587}]
        let salesArr = []
        if (this.state.lat) {
            let sales = this.getSales()
            salesArr = sales.map(sale => <div lat={sale.lat} lng={sale.lng}><i class="fas fa-location-arrow fa-2x orange mirror"></i></div>)


        }
        console.log(sales);
        return <div className='google-map'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAp_gcAL9g64umPJUNU10vjP3Y-MHbmmQo" }}
                center={{ lat: 40.7, lng: -111.80 }}
                zoom={9}>
                <div lat={this.state.lat} lng={this.state.lng}><i class="fas fa-map-marker-alt fa-2x orange"></i></div>
                {salesArr}



            </GoogleMapReact>

        </div>
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, {})(Maps);