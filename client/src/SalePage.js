import React, { Component } from 'react'
import axios from "axios"
const SaleAxios = axios.create()
SaleAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`;
    return config
})

export default class Sale extends Component {
    getSale = () => {
        const id = this.props.match.params.id;
        SaleAxios.get(`/sales/${id}`).then(respose => {
            this.setState(respose.data)

        })
    }
    componentDidMount() {
        this.getSale()
    }
    render() {
        console.log("state", this.state);

        if (this.state) {
            const { lat, lng, address, type, title, description, image_url
            } = this.state
            return (
                <div className="salePage">
                    <h2 className="saleTitle">{title.toUpperCase()}</h2>
                    <h3 className="saleClass">{type.toUpperCase()}</h3>
                    <div className="description">{description}</div>
                    <img className="imgUrl" src={image_url} alt="" />
                    <address>{address}</address>
                    <a href={`https://maps.google.com/maps?q=${lat},${lng}&hl=en&t=h&z=15`}>Map</a>
                </div>
            )
        } else {
            return(<div/>)
        }
    }
}
