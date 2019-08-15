import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

import ShiftsComponent from './shiftsComponent'

export default class ShiftPage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            shifts: [],
            sessionId: '',
            users: []
        }

        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount() {
        const { sessionId } = this.props.location.state

        if (sessionId) {
            const headers = { 'Authorization': sessionId }

            this.setState({ sessionId })

            axios
                .get('http://localhost:3000/shifts', { headers })
                .then(response => {
                    this.setState({ shifts: response.data })
                    return axios.get('http://localhost:3000/users', { headers })
                })
                .then(response => {
                    this.setState({ users: response.data })
                })
        } else {
            this.props.history.push({
                pathname: '/'
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault()

        const { user: { id }, sessionId } = this.props.location.state
        const headers = { 'Authorization': sessionId }

        axios
            .post('http://localhost:3000/shifts', {
                userId: id,
                start: e.target.date.value + ' ' + e.target.start.value,
                finish: e.target.date.value + ' ' + e.target.finish.value,
                breakLength: e.target.break.value
            }, { headers })
            .then(_ => {
                return axios.get('http://localhost:3000/shifts', { headers })
            })
            .then(response => {
                this.setState({ shifts: response.data })
            })
    }

    render() {
        if (this.props.location) {
            const { organisation, user } = this.props.location.state
            const { shifts, users } = this.state

            return (
                <div className='container' style={{ height: 'auto' }}>
                    <p>Logged in as {user ? user.name : ''} <Link to='/'>Log Out</Link></p>
                    <h2>{organisation ? organisation.name : ''}</h2>
                    <h4>Shifts</h4>
                    <ShiftsComponent
                        organisation={organisation}
                        users={users}
                        shifts={shifts}
                    />
                    <form className='shift-form' onSubmit={this.handleSubmit}>
                        <label htmlFor='date'>Shift Date: </label>
                        <input type='date' name='date' id='date' />
                        <label htmlFor='start'>Start Time: </label>
                        <input type='time' name='start' id='start' />
                        <label htmlFor='finish'>Finish Time: </label>
                        <input type='time' name='finish' id='finish' />
                        <label htmlFor='break'>Break Length (Minutes): </label>
                        <input type='text' name='break' id='break' style={{ width: '85px' }} />
                        <button>Submit</button>
                    </form>
                </div>
            )
        }
    }
}