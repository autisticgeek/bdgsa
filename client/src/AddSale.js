import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { getCurrentSales } from "./redux/authorizedUser.js"
const addSaleAxios = axios.create()
addSaleAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`;
    return config
})
const createSaleAxios = axios.create()
createSaleAxios.interceptors.request.use(config => {
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
                start_time: "",
                end_time: "",
                image_url: "",
                description: "",
                date: "",
                type: "yardsale",
                sellerId: this.props.user._id

            },
            sales: []
        }
        this.state = this.initialState;
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }
    handleChange(e) {
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
    handleSubmit(e) {
        e.preventDefault();
        console.log(this.state.inputs);

        addSaleAxios.post("/api/sale", this.state.inputs).then(response => console.log(response.data))
        this.setState(this.initialState)
    }

    componentDidMount() {
        addSaleAxios.get(`/api/sale?sellerId=${this.props.user._id}`).then(response => {
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
                    <td>{sale._id}</td>
                    <td>{sale.type}</td>
                    <td>{sale.address}</td>
                    <td>{d.toDateString()}</td>
                    <td>{sale.start_time}</td>
                    <td>{sale.end_time}</td>
                </tr>
            })
        }
        const { type, address, start_time, end_time, image_url, description, date } = this.state.inputs;

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
                    <input onChange={this.handleChange} name="address" value={address} type="text" placeholder="Address" />
                    <input onChange={this.handleChange} name="start_time" value={start_time} type="text" placeholder="Start Time" />
                    <input onChange={this.handleChange} name="end_time" value={end_time} type="text" placeholder="End Time" />
                    <input onChange={this.handleChange} name="image_url" value={image_url} type="url" placeholder="Image URL" />
                    <textarea col="10" row="5" onChange={this.handleChange} name="description" value={description} type="text" placeholder="Description" />
                    <input onChange={this.handleChange} name="date" value={date} type="date" placeholder="Date" />
                    <button className="add-Sale">Add Sale</button>
                </form>
                <table  border="1">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Type</th>
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