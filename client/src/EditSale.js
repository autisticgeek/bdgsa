import React, { Component } from 'react'
import { connect } from "react-redux";
// import axios from "axios"
import {editSale} from "./redux/authorizedUser"

const editSalesAxios = axios.create();
editSalesAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`;
    return config
})

const EditSale = (id, newSale) => {
    editSalesAxios.put(`/api/sale/${id}`, this.state.inputs).then(response => console.log(response.data))
}

class EditSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                address: props.address || "",
                start_time: props.start_time || "",
                end_time: props.end_time || "",
                image_url: props.image_url || "",
                description: props.description || "",
                date: props.date || "",
                type: props.type || "yardsale",
                // sellerId: this.props.user._id

            },
        }
        // this.state = this.initialState;
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

    handleSubmit(event) {
        event.preventDefault();
        const { saleId, editSale } = this.props
        editSale(saleId, this.state.inputs)
    }

    render() {

        const { type, address, start_time, end_time, date, image_url, description } = this.state.inputs;
        return (

            <div>
                <form onSubmit={this.handleSubmit}>
                    <select value={type} name="type" onChange={this.handleChange}>
                        <option value="yardsale" >Yardsale</option>
                        <option value="garagesale">Garagesale</option>
                        <option value="movingsale">Movingsale</option>
                        <option value="estatesale">Estatesale</option>
                    </select>
                    
                    <input onChange={this.handleChange} name="address" value={address} type="text" placeholder="Address" />
                    <input onChange={this.handleChange} name="start_time" value={start_time} type="text" placeholder="Start Time" />
                    <input onChange={this.handleChange} name="end_time" value={end_time} type="text" placeholder="End Time" />
                     <input onChange={this.handleChange} name="image_url" value={image_url} type="url" placeholder="Image URL" /> */}
                     <textarea col="10" row="5" onChange={this.handleChange} name="description" value={description} type="text" placeholder="Description" /> */}
                    <input onChange={this.handleChange} name="date" value={date} type="date" />
                    <button>Save Changes</button>
                </form>
            </div>

        )
    }
}
export default connect(null, { editSale })(EditSale);

