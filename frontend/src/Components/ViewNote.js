import React, { useRef, useState, useContext, useEffect } from 'react'
import NoteItem from './NoteItem'
import NoteContext from '../Context/Notes/NoteContext'
import { useNavigate } from 'react-router-dom';
import EditNote from './EditNote';

const ViewNote = () => {

    //Redirect to Add Note Route
    const navigate = useNavigate();
    const handleAddNoteClick = () => {
        navigate('/addNote');
    };

    //Using context to fetch available notes
    const context = useContext(NoteContext);
    const { notes, fetchNote, editNote, deleteNote, updateAlert } = context;


    const openModalRef = useRef();
    const closeModalRef = useRef();
    const initalNoteVal = useRef(); //Using this to store initial values of note being edited

    //State to manage form input value and error message
    const [noteVal, setNoteVal] = useState({ id: "", title: "", description: "" });
    const [errors, setErrors] = useState({ title: "", description: "" });

    //Function to update state value while filling the form
    const updateVal = (e) => {
        setNoteVal({ ...noteVal, [e.target.name]: e.target.value });

        // Conditional error removal based on length condition
        if (e.target.name === "title" && e.target.value.length > 0) {
            setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
        }
        if (e.target.name === "description" && e.target.value.length > 0) {
            setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
        }
    }

    //Function to open Modal
    const openModal = (noteSelected) => {
        setNoteVal({ id: noteSelected._id, title: noteSelected.title, description: noteSelected.description });
        initalNoteVal.current = { title: noteSelected.title, description: noteSelected.description };
        openModalRef.current.click();
    }

    //Fetching Notes for the user first
    useEffect(() => {
        if (localStorage.getItem("iNotebookLoginAuth")) {
            fetchNote();
        }
        // eslint-disable-next-line
    }, [notes]);

    //Function to update note
    const updateNote = () => {

        let formErrors = { title: "", description: "" };

        // Trim title and description to remove unnecessary spaces
        const trimmedTitle = noteVal.title.trim();
        if (trimmedTitle.length === 0) {
            formErrors.title = "Title cannot be blank";
        }

        const trimmedDesc = noteVal.description.trim();
        if (trimmedDesc.length === 0) {
            formErrors.description = "Description cannot be blank";
        }

        // If there are errors, set them in state and prevent form submission
        if (formErrors.title || formErrors.description) {
            setErrors(formErrors);
            return;
        }

        if (noteVal.title === initalNoteVal.current.title && noteVal.description === initalNoteVal.current.description) {
            closeModalRef.current.click();
            //Show Alert
            updateAlert("warning", "No changes made to the note.");
        } else {
            editNote(noteVal);
            closeModalRef.current.click();
            //Show Alert
            updateAlert("success", "Your note been updated!");
        }
        // Reset errors
        setErrors({ "title": "", "description": "" });
    }

    //Deleting Note
    const handleDelete = (noteId) => {
        const isConfirmed = window.confirm("Are you sure you want to delete this note?");
        if (isConfirmed) {
            deleteNote(noteId);
        }
    }

    return (
        <>
            <EditNote openRef={openModalRef} noteData={noteVal} updateNote={updateNote} closeRef={closeModalRef} error={errors} updateNoteVal={updateVal} />
            <div className='container mt-4'>
                {localStorage.getItem("iNotebookLoginAuth") ? (<div><strong>Your Notes Collection</strong>
                    <div className='row'>
                        {notes.length > 0 ? notes.map((note) => {
                            return <NoteItem key={note._id} note={note} openModal={openModal} deleteNote={handleDelete} />
                        }) : <div className='fs-6 mt-3'>No notes to show here! 📝 <strong style={{ 'cursor': 'pointer' }} onClick={handleAddNoteClick}>Why not add a note and get started?</strong></div>}
                    </div></div>) : (<strong>Please Login or Signup to create Notes.</strong>)}
            </div>

        </>
    )
}

export default ViewNote