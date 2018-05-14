import React from 'react'

function LoginForm(props) {
    return (
        <div className="form-wrapper">
            <form onSubmit={props.handleSubmit}>
                <h3>Log In</h3>
                <input
                    onChange={props.handleChange}
                    value={props.email}
                    name="email"
                    type="text"
                    placeholder="Email"/>
                <input
                    onChange={props.handleChange}
                    value={props.password}
                    name="password"
                    type="password"
                    placeholder="Password"/>
                <button type="submit">Submit</button>
                {props.errMsg && <p>{props.errMsg}</p>}
            </form>
        </div>
    )
}

export default LoginForm;