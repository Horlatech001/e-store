import React from 'react'
import '../CustomAlert.css';

const CustomAlert = ({ message }) => {
    return (
        <>
            <div className="custom-alert">
                <div className="custom-alert-message">{message}</div>
            </div>

        </>
    )
}

export default CustomAlert
