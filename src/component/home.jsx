import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            organisations: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const state = this.props.location.state
        
        if (state) {
            const headers = {
                'Authorization': state.sessionId
            }

            axios
                .get('http://localhost:3000/organisations', {
                    'headers': headers
                })
                .then(data => console.log(data))
        } else {
            this.props.history.push({
                pathname: '/'
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log('Submitted!')
    }

    render() {
        {console.log(this.state.organisations)}
        return(
            <div className='container'>
                <p className='home-header'>Logged in as <Link to='/logout'>Log Out</Link>
                <br/><br/>You aren't a member of any organizations.
                <br/>Join an existing one or create a new one.</p>
                <h2>Organisations</h2>  
                <h2>Create organisations</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='name'>Name</label>
                    <input type='name' name='name' id='name'></input>
                    <label htmlFor='rate'>Hourly rate: $</label>
                    <input type='rate' name='rate' id='rate'></input>
                    <button type='submit'>Create and join</button>
                </form>
                <Link to='/new'>Sign up</Link>
                <Link to='/forgot'>Forgot your password?</Link>
            </div>
        )
    }
}