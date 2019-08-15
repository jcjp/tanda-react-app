import React from 'react'

const ShiftsComponent = props => {
    const { organisation, users, shifts } = props

    return (
        <table border='1'>
            <thead>
                <tr>
                    <th>Employee name</th>
                    <th>Shift date</th>
                    <th>Start time</th>
                    <th>Finish time</th>
                    <th>Break length (minutes)</th>
                    <th>Hours worked</th>
                    <th>Shift cost</th>
                </tr>
            </thead>
            {shifts.length > 0 &&
                <tbody>
                    {shifts.map((shift, index) => {
                        const userObject = users.find(user => user.id === shift.userId)
                        const start = new Date(shift.start)
                        const finish = new Date(shift.finish)
                        const oneHour = 1000 * 60 * 60
                        const difference = ((finish.getTime() - (start.getTime()) - (shift.breakLength * 1000 * 60))) / oneHour
                        return (
                            <tr key={index}>
                                <td>{userObject ? userObject.name : ''}</td>
                                <td>{start.toLocaleDateString('en-US').split(',')[0]}</td>
                                <td>{start.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
                                <td>{finish.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</td>
                                <td>{shift.breakLength}</td>
                                <td>{difference}</td>
                                <td>{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(difference * organisation.hourlyRate)}</td>
                            </tr>
                        )
                    }
                    )}
                </tbody>
            }
        </table>
    )
}

export default ShiftsComponent