import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            organisations: [],
            sessionId: ''
        }

        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleLogout = this.handleLogout.bind(this)
        this.handleLeave = this.handleLeave.bind(this)
        this.handleJoin = this.handleJoin.bind(this)
    }

    componentDidMount() {

        if (this.props.location.state) {
            const { sessionId } = this.props.location.state

            this.setState({ sessionId })

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

    /* componentDidUpdate(prevProps, prevState) {
        if (!prevProps.location.state.organisations) {
            this.props.history.push({ pathname: '/home' })
        }
    } */

    handleSubmit(e) {
        e.preventDefault();

        axios
            .post('http://localhost:3000/organisations/create_join',
                { name: e.target.name.value, hourlyRate: e.target.rate.value },
                { headers: { 'Authorization': this.state.sessionId } })
            .then(response => console.log(response))

    }

    handleLogout() {
        axios
            .delete('http://localhost:3000/auth/logout', { headers: { 'Authorization': this.state.sessionId } })
            .then(response => {
                if (response.status === 200) {
                    this.setState({
                        user: {},
                        organisations: [],
                        sessionId: ''
                    })

                    this.props.history.push({
                        pathname: '/'
                    })
                }
            })
    }

    handleLeave() {
        axios
            .post('http://localhost:3000/organisations/leave', null, { headers: { 'Authorization': this.state.sessionId } })
            .then(_ => this.forceUpdate())
    }

    handleJoin(organisationId) {
        axios
            .post('http://localhost:3000/organisations/join', { organisationId }, { headers: { 'Authorization': this.state.sessionId } })
            .then(_ => this.forceUpdate())
    }

    render() {
        const { organisations, user, sessionId } = this.state
        const organisation = organisations.find(organisation => organisation.id === user.organisationId)

        return (
            <div className='container'>
                <p className='home-header'>Logged in as {user ? user.name : ''} <Link to='#' onClick={this.handleLogout}>Log Out</Link>
                    {
                        user && !user.organisationId ?
                            <React.Fragment>
                                <br /><br />You aren't a member of any organizations.
                                <br />Join an existing one or create a new one.
                            </React.Fragment> : ''
                    }
                </p>
                {
                    user && !user.organisationId ?
                        <React.Fragment>
                            <h2>Organisations</h2>
                            <ul>
                                {organisations.length > 0 && organisations.map((organisation, index) =>
                                    <li key={index}>{organisation.name} <Link to={{ pathname: '/edit', state: { organisation, user, sessionId } }} >Edit</Link> <Link to='/home' onClick={() => this.handleJoin(organisation.id)}>Join</Link></li>
                                )}
                            </ul>
                            <h2>Create organisations</h2>
                            <form onSubmit={this.handleSubmit}>
                                <label htmlFor='name'>Name</label>
                                <input type='name' name='name' id='name'></input>
                                <label htmlFor='rate'>Hourly rate: $</label>
                                <input type='rate' name='rate' id='rate'></input>
                                <button type='submit'>Create and join</button>
                            </form>
                            <Link to={{ pathname: '/forgot', state: { user, sessionId } }}>Forgot your password?</Link>
                        </React.Fragment> :
                        <React.Fragment>
                            <h2>{organisation ? organisation.name : ''}</h2>
                            <div className='home-links'>
                                <Link to='/shifts'>View Shifts</Link>
                                <Link to={{ pathname: '/edit', state: { organisation, user, sessionId } }} >Edit</Link>
                                <Link to='/home' onClick={this.handleLeave}>Leave</Link>
                                <Link to={{ pathname: '/forgot', state: { user, sessionId } }}>Forgot your password?</Link>
                            </div>
                        </React.Fragment>
                }
            </div>
        )
    }
}