import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class OrganisationComponent extends Component {
    constructor(props) {
        super(props)

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLeave = this.handleLeave.bind(this)
    }

    componentDidMount() {
        const state = this.props.location.state

        if (state) {
            this.setState({ sessionId: state.sessionId })

            const headers = { 'Authorization': state.sessionId }

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

        axios
            .post('http://localhost:3000/organisations/create_join',
                { name: e.target.name.value, hourlyRate: e.target.rate.value },
                { headers: { 'Authorization': this.state.sessionId } })
            .then(response => console.log(response))

    }

    handleLeave() {
        axios
            .post('http://localhost:3000/organisations/leave', { headers: { 'Authorization': this.state.sessionId } })
    }

    render() {
        const { organisation, user } = this.props.location.state
        return (
            <div className='container'>
                <p className='home-header'>Logged in as {user ? user.name : ''} <Link to='#' onClick={this.handleLogout}>Log Out</Link></p>
                <h2>Edit Organisation</h2>
                <form>
                    <label htmlFor='name'>Name:</label>
                    <input type='text' defaultValue={organisation ? organisation.name : ''}/>
                    <label htmlFor='rate'>Hourly Rate: $</label>
                    <input type='text' defaultValue={organisation ? organisation.hourlyRate : ''}/> per hour
                    <button>update</button>
                </form>
                <Link to='#'>Delete</Link>
            </div>
        )
    }
}