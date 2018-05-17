import React, { Component } from "react";
import GoogleMapReact from 'google-map-react'
import axios from "axios"

import { connect } from "react-redux";

class Maps extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 0,
            lng: 0,
            sales: []
        }
        this.onGeolocateError = this.onGeolocateError.bind(this);
        this.onGeolocateSuccess = this.onGeolocateSuccess.bind(this);
        this.geolocate = this.geolocate.bind(this)

    }
    onGeolocateSuccess = (coordinates) => {
        const { latitude, longitude } = coordinates.coords;
        console.log('Found coordinates: ', latitude, longitude);
        this.setState(() => {
            return {
                ...this.state,
                lat: latitude,
                lng: longitude
            };
        });
    }

    onGeolocateError = (error) => {
        console.warn(error.code, error.message);

        if (error.code === 1) {
            console.log("they said no")
        } else if (error.code === 2) {
            console.log("position unavailable")
        } else if (error.code === 3) {
            console.log("timeout")
        }
    }
    geolocate = () => {
        if (window.navigator && window.navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.onGeolocateSuccess, this.onGeolocateError);
        }
    }
    getSales = () => {
        axios.get(`/sales`).then(responce => {
            console.log("get sales", responce.data)
            let sales = responce.data.filter(sale =>{
                return true
            })
            this.setState({
                ...this.state,
                sales: responce.data
            })
        })
    }
    componentDidMount() {
        this.geolocate();
        this.getSales();
    }


    render() {
        console.log("props", this.props)
        console.log("state", this.state)
        let salesArr = []
        if (this.state.lat && this.state.sales.length > 0) {
            
            salesArr = this.state.sales.map(sale => {
                console.log("sale", sale);
                
            return <div  key={sale._id} lat={sale.lat.$numberDecimal} lng={sale.lng.$numberDecimal}><i class="fas fa-location-arrow fa-2x orange mirror"></i></div>})
        }


        return <div className='google-map'>
            <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyAp_gcAL9g64umPJUNU10vjP3Y-MHbmmQo" }}
                center={{ lat: 40.7, lng: -111.80 }}
                zoom={9}>
                <div lat={this.state.lat} lng={this.state.lng}><i class="fas fa-map-marker-alt fa-2x orange"></i></div>
                {salesArr}



            </GoogleMapReact>

        </div >
    }
}

const mapStateToProps = state => {
    return state;
}

export default connect(mapStateToProps, {})(Maps);