import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function SignupPage() {
    function handleSubmit(e) {
        e.preventDefault();

        const { target: { name, email, password, confirm } } = e

        axios
            .post('http://localhost:3000/auth/signup', {
                name: name.value,
                email: email.value,
                password: password.value,
                passwordConfirmation: confirm.value
            })
            .then(response => {
                if (response)
                    this.props.history.push({
                        pathname: '/home',
                        state: {
                            data: response.config.data,
                            sessionId: response.data.sessionId
                        }
                    })
            })
    }

    return(
        <div className='container'>
            <h3>Sign up</h3>
            <form className='form-signup' onSubmit={handleSubmit}>
                <label htmlFor=''>Name</label>
                <input type='text' name='name' id='name'/>
                <label htmlFor='email'>Email</label>
                <input type='text' name='email' id='email'/>
                <label htmlFor='password'>Password<br /><em>(6 characters minimum)</em></label>
                <input type='password' name='password' id='password'/>
                <label htmlFor='confirm'>Password Confirmation</label>
                <input type='password' name='confirm' id='confirm'/>
                <button>Sign up</button>
            </form>
            <Link to='/'>Log in</Link>
        </div>
    )
}

