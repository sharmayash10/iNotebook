import React from 'react'

const NoteItem = (props) => {
    return (
        <>
            <div className="col-md-4">
                <div className="card my-2">
                    <div className="card-body">
                        <div className="d-flex align-items-center">
                            <h5 className="card-title m-0 me-auto">{props.note.title}</h5>
                            <i className="fa-solid fa-pencil" onClick={() => props.openModal(props.note)}></i>
                            <i className="fa-solid fa-trash ms-3" onClick={() => props.deleteNote(props.note._id)}></i>
                        </div>
                        <p className="card-text mt-3">{props.note.description}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default NoteItem