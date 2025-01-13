import React from 'react'

const EditNote = (props) => {
    let {openRef, noteData, updateNoteVal, updateNote, closeRef, error} = props;
    return (
        <>
            <button type="button" ref={openRef} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#updateNote">
                Update Note
            </button>

            <div className="modal fade" id="updateNote" tabIndex="-1" aria-labelledby="updateNote" aria-hidden="true" aria-modal="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title"><strong>Make Changes to Your Note</strong></div>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group mb-3">
                                    <label htmlFor="title">Title</label>
                                    <input type="text" className="form-control shadow-none" name='title' id="title" value={noteData.title} onChange={updateNoteVal} placeholder="Enter title of your note" />
                                    {error.title && <small className="text-danger">{error.title}</small>}
                                </div>
                                <div className="form-group mb-3">
                                    <label htmlFor="description">Description</label>
                                    <input type="text" className="form-control shadow-none" name='description' id="description" value={noteData.description} onChange={updateNoteVal} placeholder="Describe your note in few words" />
                                    {error.description && <small className="text-danger">{error.description}</small>}
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeRef} className="btn btn-sm btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" className="btn btn-sm btn-primary" onClick={updateNote}>Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditNote