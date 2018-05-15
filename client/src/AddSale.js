import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { getCurrentSales } from "./redux/authorizedUser.js"
const saleAxios = axios.create()
saleAxios.interceptors.request.use(config =>{
    const token = localStorage.getItem("token")
    config.headers.Authorization=`Bearer ${token}`;
    return config
})
class AddSale extends Component {
    constructor(props) {
        super(props);
        this.initialState = {
            inputs: {
               address:"",
               start_time:"",
               end_time:"",
               image_url:"",
               description: "",
               date:"",
               type :"yardsale",
               sellerId:this.props.user._id

            },
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
        
        saleAxios.post("/api/sale", this.state.inputs).then(response => console.log(response.data))
        // const { inputs } = this.state;
        // this.props.getCurrentSales();
        // this.setState(this.initialState)
    }


    render() {
        
        const { type, address, start_time, end_time, image_url, description, date} = this.state.inputs;
        return (

            <div className="form-body">
                <h1>Add Sale</h1>

                <form className="add-form" onSubmit={this.handleSubmit}>
                    <select value ={type} name="type" onChange={this.handleChange}>
                        <option value="yardsale" >Yardsale</option>
                        <option value="garagesale">Garagesale</option>
                        <option value="movingsale">Movingsale</option>
                        <option value="estatesale">Estatesale</option>
                    </select>
                    <input  onChange={this.handleChange} name="address" value={address} type="text" placeholder="Address" />
                    <input onChange={this.handleChange} name="start_time" value={start_time} type="text" placeholder="Start Time"/>
                    <input onChange={this.handleChange} name="end_time" value={end_time} type="text" placeholder="End Time" />
                    <input  onChange={this.handleChange} name="image_url" value={image_url} type="url" placeholder="Image URL" />
                    <textarea col="10" row="5" onChange={this.handleChange} name ="description" value={description} type="text" placeholder="Description" />
                    <input onChange={this.handleChange} name="date" value={date} type="date" placeholder="Date"/>                  
                    <button className="add-Sale">Add Sale</button>
                </form>
            </div>

        )
    }
}
export default connect(state => state, { getCurrentSales })(AddSale);