import NoteContext from "./NoteContext";
import React, { useState } from "react";

const NoteState = (props) => {

    const baseURI = "http://localhost/5000"; //Hostname for the API - Backend
    const authToken = localStorage.getItem("iNotebookLoginAuth");

    //Managing Alert State
    const [alert, setAlert] = useState({ show: 0, message: "", type: "" });

    function updateAlert(type, msg) {
        setAlert({
            message: msg,
            type: type,
            show: 1
        });

        setTimeout(() => {
            setAlert({
                message: "",
                type: ""
            });
        }, 2000);
    }

    //Managing the state of the notes
    const [notes, setNotes] = useState([]);

    //Fetching all notes
    const fetchNote = async () => {

        //Fetch API
        const response = await fetch(`${baseURI}/api/notes/fetchAll`, {
            method: 'GET',
            headers: new Headers({
                "Content-Type": "application/json",
                "auth-token": authToken
            })
        });
        var jsonResponse = await response.json();
        setNotes(jsonResponse.userNotes);
    }

    //Adding a note
    const addNote = async (data) => {
        var { title, description } = data

        //Add Note API
        const response = await fetch(`${baseURI}/api/notes/addNote`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
                "auth-token": authToken
            }),
            body: JSON.stringify({ title, description }),
        });
        var jsonResponse = await response.json();
        setNotes(notes.concat(jsonResponse.note));
    }

    //Deleting a Note
    const deleteNote = async (id) => {
        //Delete Note API
        await fetch(`${baseURI}/api/notes/deleteNote/${id}`, {
            method: 'DELETE',
            headers: new Headers({
                "Content-Type": "application/json",
                "auth-token": authToken
            })
        });
        // var jsonResponse = await response.json();

        //Managing it in frontend
        const newNotes = notes.filter((note) => {
            return note._id !== id
        });
        setNotes(newNotes);

        //Show Alert in frontend
        updateAlert("success", "Your note has been deleted!");
    }

    //Editing a Note
    const editNote = async (data) => {
        var { id, title, description } = data;
        //Update Note API
        await fetch(`${baseURI}/api/notes/updateNote/${id}`, {
            method: 'PUT',
            headers: new Headers({
                "Content-Type": "application/json",
                "auth-token": authToken
            }),
            body: JSON.stringify({ title, description }),
        });

        //Managing it in frontend
        const updatedNotes = notes.map(note =>
            note._id === id ? { ...note, title: title, description: description } : note
        );

        // Update the state with the new notes array
        setNotes(updatedNotes);
    }

    //Login User
    const login = async (data) => {
        var { username, password } = data;
        //Update Note API
        const loginAuth = await fetch(`${baseURI}/api/auth/login`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({ username, password }),
        });

        //Storing Auth Token in localStorage
        var jsonResponse = await loginAuth.json();

        if(jsonResponse.status){
            localStorage.setItem("iNotebookLoginAuth", jsonResponse.authtoken);
        }
        return jsonResponse;
    }

    //Create User
    const signUp = async (data) => {
        var { email, username, password } = data;
        //Update Note API
        const signupAuth = await fetch(`${baseURI}/api/auth/createuser`, {
            method: 'POST',
            headers: new Headers({
                "Content-Type": "application/json",
            }),
            body: JSON.stringify({ username, email, password }),
        });

        //Storing Auth Token in localStorage
        var jsonResponse = await signupAuth.json();

        if(jsonResponse.status){
            localStorage.setItem("iNotebookLoginAuth", jsonResponse.authtoken);
        }
        return jsonResponse;
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, fetchNote, deleteNote, editNote, alert, updateAlert, login, signUp }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState
