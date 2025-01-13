import React, { useContext } from 'react'
import NoteContext from '../Context/Notes/NoteContext'

const Alert = () => {

    //Using context to get Alert type and Message
    const context = useContext(NoteContext);
    const { alert } = context;

    return (
        <div className={!alert.show ? "d-none" : ""}>
            <div className={`alert alert-${alert.type} mb-2 pt-2 pb-2`} role="alert">
                {alert.message}
            </div>
        </div>
    )
}

export default Alert
