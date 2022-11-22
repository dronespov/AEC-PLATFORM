import React from 'react'
import zxcvbn from 'zxcvbn'

const PasswordLengthMeter = ({ password }) => {

    console.log(password.length)

    const Length = () => {
        switch (password.length) {
            case 2:
                return '25%'
            case 4:
                return '50%'
            case 6:
                return '75%'
            case 8:
                return '100%'
            default:
                return 'none'
        }
    }
    const progressColor = () => {
        switch (password.length) {
            case 2:
                return 'bg-danger'
            case 4:
                return 'bg-warning'
            case 6:
                return 'bg-info'
            case 8:
                return 'bg-success'
            default:
                return 'none'
        }
    }

    const changePasswordColor = () => ({
        width: Length(),
        background: progressColor(),
        height: '7px'
    })
    return (
        <div className='progress' style={{ height: '7px' }}>
            <div className='progress-bar' style={changePasswordColor()}>

            </div>
        </div>
    )
}

export default PasswordLengthMeter