import React, { useContext, useState } from 'react'
import NoteContext from '../Context/Notes/NoteContext';

const AddNote = () => {

    //Using Context for adding a note
    const context = useContext(NoteContext);
    var { addNote, updateAlert, alert } = context;

    //State to manage form input value and error messages
    const [value, setValue] = useState({ "title": "", "description": "" });
    const [errors, setErrors] = useState({ "title": "", "description": "" });

    //Function to update state value while filling the form
    const updateVal = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });

        // Conditional error removal based on length condition
        if (e.target.name === "title" && e.target.value.length > 0) {
            setErrors((prevErrors) => ({ ...prevErrors, title: "" }));
        }
        if (e.target.name === "description" && e.target.value.length > 0) {
            setErrors((prevErrors) => ({ ...prevErrors, description: "" }));
        }
    }

    //Function to add note on submitting form
    const addNoteFunc = (e) => {
        e.preventDefault();

        // Validate inputs and set errors
        let formErrors = { title: "", description: "" };

        const trimmedTitle = value.title.trim();
        ;
        if (trimmedTitle.length === 0) {
            formErrors.title = "Title cannot be blank";
        }        

        const trimmedDesc = value.description.trim();
        if(trimmedDesc.length === 0){
            formErrors.description = "Description cannot be blank";
        }

        // If there are errors, set them in state and prevent form submission
        if (formErrors.title || formErrors.description) {
            setErrors(formErrors);
            return;
        }

        addNote(value);
        setValue({ "title": "", "description": "" }); //Empty the form fields once submitted;

        //Show Alert
        updateAlert("success", "Your note been added!");

        // Reset errors
        setErrors({ "title": "", "description": "" });
    }

    return (
        <>
            {/* Add margin top only when alert is not visible */}
            {localStorage.getItem("iNotebookLoginAuth") ? <div className={`container ${alert.show ? '' : 'mt-4'}`}>
                <strong>Let’s Create a New Note!</strong>
                <form className='my-3'>
                    <div className="form-group mb-3">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control shadow-none mt-1" name='title' id="title" value={value.title} onChange={updateVal} placeholder="Enter title of your note" />
                        {errors.title && <small className="text-danger">{errors.title}</small>}
                    </div>
                    <div className="form-group mb-3">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control shadow-none mt-1" name='description' id="description" value={value.description} onChange={updateVal} placeholder="Describe your note in few words" />
                        {errors.description && <small className="text-danger">{errors.description}</small>}
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={addNoteFunc}>Add Note</button>
                </form>
            </div> : <div className='container mt-4'><strong>Please Login or Signup to create Notes.</strong></div>}
        </>
    )
}

export default AddNote
