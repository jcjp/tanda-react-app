import React from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


export default function ForgotPasswordPage(props) {
    function handleSubmit(e) {
        e.preventDefault()

        const { target: { old, newpass, confirm } } = e

        axios
            .put('http://localhost:3000/users/me/change_password', {
                oldPassword: old.value,
                newPassword: newpass.value,
                newPasswordConfirmation: confirm.value
            }, { headers: { 'Authorization': props.location.state.sessionId } })
            .then(response => {
                if (response)
                    props.history.push({
                        pathname: '/'
                    })
            })
    }

    return(
        <div className='container'>
            <h3>Forgot Password</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor='old'>Old Password</label>
                <input type='password' name='old' id='old'/>
                <label htmlFor='newpass'>New Password<br /><em>(6 characters minimum)</em></label>
                <input type='password' name='newpass' id='newpass'/>
                <label htmlFor='confirm'>New Password Confirmation</label>
                <input type='password' name='confirm' id='confirm'/>
                <button>Change Password</button>
            </form>
        </div>
    )
}

