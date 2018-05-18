import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { getCurrentSales } from "./redux/authorizedUser.js"
import Geocode from "react-geocode";
import { Link } from "react-router-dom";


const SaleAxios = axios.create()
SaleAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`;
    return config
})

class AddSale extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
                address: "",
                title: "",
                start_time: "",
                end_time: "",
                image_url: "",
                description: "",
                date: "",
                type: "yardsale",
                sellerId: this.props.user._id,
                lat: 0,
                lng: 0

            },
            sales: []
        }
        this.state = this.initialState;
    }
    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState(prevState => {
            return {
                inputs: {
                    ...prevState.inputs,
                    [name]: value
                }
            }
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        Geocode.setApiKey("AIzaSyDXLSCan0a10cZmkSk66pqS6WDP0gUKc-Q");
        Geocode.enableDebug();
        Geocode.fromAddress(this.state.inputs.address).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                const { formatted_address } = response.results[0]
                this.setState({
                    ...this.state,
                    inputs: {
                        ...this.state.inputs,
                        address: formatted_address,
                        lat,
                        lng
                    }
                })
                SaleAxios.post("/api/sale", this.state.inputs).then(response => {
                    this.setState({
                        ...this.state,
                        inputs: this.initialState.inputs,
                        sales: [response.data, ...this.state.sales]
                    })
                })
            },
            error => {
                console.error(error);
            }
        )
    }

    delSale = (id) => {
        SaleAxios.delete(`/api/sale/${id}`).then(response => {
            this.setState({
                ...this.state,
                sales: this.state.sales.filter(sale => {
                    if (sale._id === id) return false
                    return true
                })
            })
        })
    }


    componentDidMount() {
        SaleAxios.get(`/api/sale?sellerId=${this.props.user._id}`).then(response => {
            this.setState(prevState => {
                return {
                    ...prevState,
                    sales: response.data
                }
            })
        })
    }

    render() {
        let ShowSales
        if (this.state.sales) {
            ShowSales = this.state.sales.map(sale => {
                let d = new Date(sale.date)
                return <tr key={sale._id}>
                    <td>
                        <i class="fas fa-trash" onClick={() => this.delSale(sale._id)}></i>
                        <Link to={`details/${sale._id}`}><i class="far fa-folder-open"></i></Link>
                        <Link to={`editSale/${sale._id}`}><i class="far fa-edit"></i></Link>
                    </td>
                    <td>{sale.type}</td>
                    <td>{sale.title}</td>
                    <td>{sale.address}</td>
                    {/* <td>{sale.description}</td> */}
                    <td>{d.toDateString()}</td>
                    <td>{sale.start_time}</td>
                    <td>{sale.end_time}</td>
                </tr>
            })
        }
        const { type, address, start_time, end_time, image_url, description, date, title } = this.state.inputs;

        return (

            <div className="form-body">
                <h1>Add Sale</h1>

                <form className="add-form" onSubmit={this.handleSubmit}>
                    <select value={type} name="type" onChange={this.handleChange}>
                        <option value="yardsale" >Yardsale</option>
                        <option value="garagesale">Garagesale</option>
                        <option value="movingsale">Movingsale</option>
                        <option value="estatesale">Estatesale</option>
                    </select>
                    <textarea onChange={this.handleChange} name="address" value={address} placeholder="Address" />
                    <input onChange={this.handleChange} name="title" value={title} placeholder="title" />
                    {/* <input onChange={this.handleChange} name="address" value={address} placeholder="Address" /> */}
                    <input onChange={this.handleChange} name="start_time" value={start_time} type="text" placeholder="Start Time" />
                    <input onChange={this.handleChange} name="end_time" value={end_time} type="text" placeholder="End Time" />
                    <textarea col="10" row="5" onChange={this.handleChange} name="description" value={description} type="text" placeholder="Description" />
                    <input onChange={this.handleChange} name="image_url" value={image_url} type="url" placeholder="Image URL" />
                    <input onChange={this.handleChange} name="date" value={date} type="date" placeholder="Date" />
                    <button className="add-Sale">Add Sale</button>
                </form>
                <table border="1">
                    <thead>
                        <tr>
                            <th>action</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Description</th>
                            <th>Address</th>
                            <th>Date</th>
                            <th>Start Time</th>
                            <th>End Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ShowSales}
                    </tbody>
                </table>
            </div>

        )
    }
}
export default connect(state => state, { getCurrentSales })(AddSale);