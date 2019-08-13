import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default function SignupPage() {
    function handleSubmit(e) {
        e.preventDefault();
        console.log('Submitted!')
    }

    return(
        <div className='container'>
            <h3>Sign up</h3>
            <form className='form-signup' onSubmit={handleSubmit}>
                <label htmlFor=''>Name</label>
                <input type='text' name='name' id='name'/>
                <label htmlFor='email'>Email</label>
                <input type='text' name='email' id='email'/>
                <label htmlFor='password'>Password</label>
                <input type='text' name='password' id='password'/>
                <label htmlFor='confirm'>Password Confirmation</label>
                <input type='text' name='confirm' id='confirm'/>
            </form>
            <Link to='/'>Log in</Link>
        </div>
    )
}

