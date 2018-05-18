import React, { Component } from 'react'
import { connect } from "react-redux";
import axios from "axios"
//import {editSale} from "./redux/authorizedUser"

const editSalesAxios = axios.create();
editSalesAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token")
    config.headers.Authorization = `Bearer ${token}`;
    return config
})

const EditedSale = (id, obj) => {
    editSalesAxios.put(`/api/sale/${id}`, obj).then(window.location.assign("/addSale"))
}

class EditSale extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputs: {
                address:"",
                start_time:"",
                end_time:"",
                image_url: "",
                description: "",
                date:"",
                type: "",
                sellerId: ""

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
        EditedSale(this.state.inputs._id, this.state.inputs)
    }
    getSale = () => { const id = this.props.match.params.id;
        axios.get(`/sales/${id}`).then(respose => {
            this.setState({
                ...this.state,
                inputs:respose.data})
            console.log("getsale called", respose.data);

        })
    }
    componentDidMount() {
        this.getSale()
    }

    render() {
        console.log("state edit", this.state);
        

        const { type, address, start_time, end_time, date, image_url, description, title } = this.state.inputs;
        return (

            <div>
                <form onSubmit={this.handleSubmit}>
                    <select value={type} name="type" onChange={this.handleChange}>
                        <option value="yardsale" >Yardsale</option>
                        <option value="garagesale">Garagesale</option>
                        <option value="movingsale">Movingsale</option>
                        <option value="estatesale">Estatesale</option>
                    </select>
                    
                    <input onChange={this.handleChange} name="title" value={title} type="text" placeholder="Title" />
                    <input onChange={this.handleChange} name="address" value={address} type="text" placeholder="Address" />
                    <input onChange={this.handleChange} name="start_time" value={start_time} type="text" placeholder="Start Time" />
                    <input onChange={this.handleChange} name="end_time" value={end_time} type="text" placeholder="End Time" />
                     <input onChange={this.handleChange} name="image_url" value={image_url} type="url" placeholder="Image URL" /> 
                     <textarea col="10" row="5" onChange={this.handleChange} name="description" value={description} type="text" placeholder="Description" /> 
                    <input onChange={this.handleChange} name="date" value={date} type="date" />
                    <button>Save Changes</button>
                </form>
            </div>

        )
    }
}
export default connect(null, {  })(EditSale);

