import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class LoginPage extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleSubmit(e) {
        e.preventDefault();
        axios
            .post('http://localhost:3000/auth/login', {
                email: e.target.email.value,
                password: e.target.password.value
            })
            .then(response => {
                if(response) {
                    this.props.history.push({
                        pathname: '/home',
                        state: {
                            data: response.config.data,
                            sessionId: response.data.sessionId
                        }
                    })
                }
            })
    }

    render() {
        return(
            <div className='container'>
                <h3>Log in</h3>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='email'>Email</label>
                    <input type='email' name='email' id='email'></input>
                    <label htmlFor='password'>Password</label>
                    <input type='password' name='password' id='password'></input>
                    <input type='checkbox' name='remember' id='remember' style={{alignSelf: 'flex-start'}}></input>
                    <label htmlFor='remember'>Remember me</label>
                    <button type='submit'>Log in</button>
                </form>
                <Link to='/new'>Sign up</Link>
                <Link to='/forgot'>Forgot your password?</Link>
            </div>
        )
    }
}