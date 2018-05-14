import React from 'react'

function SignupForm(props) {
    return (
        <div className="form-wrapper">
            <form onSubmit={props.handleSubmit}>
                <h3>Sign Up</h3>
                <input onChange={props.handleChange}
                    value={props.name}
                    name="name"
                    type="text"
                    placeholder="Name" />
                    
                <input onChange={props.handleChange}
                    value={props.email}
                    name="email"
                    type="text"
                    placeholder="Email Address" />

                <input onChange={props.handleChange}
                    value={props.phoneNumber}
                    name="phoneNumber"
                    type="text"
                    placeholder="Phone Number" />

                <input onChange={props.handleChange}
                    value={props.password}
                    name="password"
                    type="password"
                    placeholder="Password" />
                <button type="submit">Create Account</button>
                {props.errMsg && <p>{props.errMsg}</p>}
            </form>
        </div>
    )
}

export default SignupForm