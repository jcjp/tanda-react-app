import React, { Component } from 'react'
import axios from 'axios'
import HomeComponent from './homeComponent';

export default class HomePage extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            organisations: [],
            organisation: {},
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
                    const { user } = this.state
                    const organisation = response.data.find(organisation => organisation.id === user.organisationId)
                    this.setState({ organisations: response.data, organisation })
                })
        } else {
            this.props.history.push({
                pathname: '/'
            })
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        
        const { sessionId } = this.state
        const headers = { 'Authorization': sessionId }

        axios
            .post('http://localhost:3000/organisations/create_join',
                { name: e.target.name.value, hourlyRate: e.target.rate.value },
                { headers })
            .then(_ => {
                return axios.get('http://localhost:3000/organisations', { headers })
            })
            .then(response => {
                const { user } = this.state
                const organisation = response.data.find(organisation => organisation.id === user.organisationId)
                this.setState({ organisations: response.data, organisation })
                this.props.history.push('/home')
            })

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
            .then(_ => this.setState({ organisation: null }))
    }

    handleJoin(organisationId) {
        axios
            .post('http://localhost:3000/organisations/join', { organisationId }, { headers: { 'Authorization': this.state.sessionId } })
            .then(_ => {
                const { organisations } = this.state
                const organisation = organisations.find(organisation => organisation.id === organisationId)
                this.setState({ organisation })
                this.props.history.push('/home')
            })
    }

    render() {
        const { organisations, organisation, user, sessionId } = this.state

        return <HomeComponent
            organisations={organisations}
            organisation={organisation}
            user={user}
            sessionId={sessionId}
            handleLogout={this.handleLogout}
            handleSubmit={this.handleSubmit}
            handleLeave={this.handleLeave}
            handleJoin={this.handleJoin}
        />
    }
}