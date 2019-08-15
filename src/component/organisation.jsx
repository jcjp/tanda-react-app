import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class OrganisationPage extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLeave = this.handleLeave.bind(this)
    }

    componentDidMount() {
        const { sessionId } = this.props.location.state

        if (sessionId) {
            const headers = { 'Authorization': sessionId }

            axios
                .get('http://localhost:3000/users/me', { headers })
                .then(response => {
                    this.setState({ user: response.data })
                    return axios.get('http://localhost:3000/organisations', { headers })
                })
                .then(response => {
                    this.setState({ organisations: response.data })
                })
        } else {
            this.props.history.push({
                pathname: '/'
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();

        const { organisation, sessionId } = this.props.location.state

        axios
            .put('http://localhost:3000/organisations/' + organisation.id,
                { name: e.target.name.value, hourlyRate: e.target.rate.value },
                { headers: { 'Authorization': sessionId } })
            .then(response => console.log(response))

    }

    handleLeave() {
        const { sessionId } = this.props.location.state

        axios
            .post('http://localhost:3000/organisations/leave', { headers: { 'Authorization': sessionId } })
    }

    render() {
        const { organisation, user } = this.props.location.state

        return (
            <div className='container'>
                <p className='home-header'>Logged in as {user ? user.name : ''} <Link to='/'>Log Out</Link></p>
                <h2>Edit Organisation</h2>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' name='name' id='name' defaultValue={organisation ? organisation.name : ''}/>
                    <label htmlFor='rate'>Hourly Rate: $</label>
                    <input type='text' name='rate' id='rate' defaultValue={organisation ? organisation.hourlyRate : ''}/> per hour
                    <button>Update</button>
                </form>
                {/* <Link to='#' style={{ marginTop: '0.5%' }}>Delete</Link> */}
            </div>
        )
    }
}