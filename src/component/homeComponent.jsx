import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const HomeComponent = props => {
    const { organisations, organisation, user, sessionId, handleLogout, handleSubmit, handleLeave, handleJoin } = props

    return (
        <div className='container' style={{ height: 'auto' }}>
            <p>Logged in as {user ? user.name : ''} <Link to='#' onClick={handleLogout}>Log Out</Link>
                {
                    user && !organisation ?
                        <span>
                            <br /><br />You aren't a member of any organizations.
                                    <br />Join an existing one or create a new one.
                                </span> : ''
                }
            </p>
            {
                user && !organisation ?
                    <div>
                        <h2>Organisations</h2>
                        <ul>
                            <OrganisationListComponent
                                organisations={organisations}
                                user={user}
                                sessionId={sessionId}
                                handleJoin={handleJoin}
                            />
                        </ul>
                        <h2>Create organisations</h2>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor='name'>Name</label>
                            <input type='name' name='name' id='name'></input>
                            <label htmlFor='rate'>Hourly rate: $</label>
                            <input type='rate' name='rate' id='rate'></input>
                            <button type='submit'>Create and join</button>
                        </form>
                        <Link to={{ pathname: '/forgot', state: { user, sessionId } }}>Change password</Link>
                    </div> :
                    <div>
                        <h2>{organisation ? organisation.name : ''}</h2>
                        <div className='home-links'>
                            <Link to={{ pathname: '/shifts', state: { organisation, user, sessionId } }}>View Shifts</Link>
                            <Link to={{ pathname: '/edit', state: { organisation, user, sessionId } }} >Edit</Link>
                            <Link to='/home' onClick={handleLeave}>Leave</Link>
                            <Link to={{ pathname: '/forgot', state: { user, sessionId } }}>Change password</Link>
                        </div>
                    </div>
            }
        </div>
    )
}

const OrganisationListComponent = props => {
    const { organisations, user, sessionId, handleJoin } = props

    return(
        organisations.length > 0 && organisations.map((organisation, index) =>
            <li key={index}>{organisation.name} <Link to={{ pathname: '/edit', state: { organisation, user, sessionId } }} >Edit</Link> <Link to='/home' onClick={() => handleJoin(organisation.id)}>Join</Link></li>
        )
    )
}

export default HomeComponent
