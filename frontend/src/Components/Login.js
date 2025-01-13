import React, { useState, useContext } from 'react'
import NoteContext from '../Context/Notes/NoteContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    var context = useContext(NoteContext);
    var { login, updateAlert } = context

    //State to store form input value
    const [credential, setCredential] = useState({ username: "", password: "" });
    const [errors, setErrors] = useState({ "username": "", "password": "" });

    //Redirect to View Note Route after login
    const navigate = useNavigate();
    const redirectToView = () => {
        navigate('/');
    };

    //Login Function
    const handleLogin = async (e) => {
        e.preventDefault();

        // Validate inputs and set errors
        let formErrors = { username: "", password: "" };

        const trimmedUsername = credential.username.trim();
        if (trimmedUsername.length === 0) {
            formErrors.username = "Username cannot be blank";
        }

        const trimmedPassword = credential.password.trim();
        if (trimmedPassword.length === 0) {
            formErrors.password = "Password cannot be blank";
        }

        // If there are errors, set them in state and prevent form submission
        if (formErrors.username || formErrors.password) {
            setErrors(formErrors);
            return;
        }

        //Hit login API
        const loginResponse = await login(credential);

        //Redirect to View Note Route after login
        if (loginResponse.status) {
            //Show Success Alert
            updateAlert("success", "Logged in successfully");
            redirectToView();
            setCredential({ username: "", password: "" });
        } else {
            //Show Error Alert
            updateAlert("danger", loginResponse.message);
        }

    }

    //Handle form values when changed
    const handleChange = (e) => {
        setCredential({ ...credential, [e.target.name]: e.target.value });

        // Conditional error removal based on length condition
        if (e.target.name === "username" && e.target.value.length > 0) {
            setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
        }
        if (e.target.name === "password" && e.target.value.length > 0) {
            setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
        }
    }
    return (
        <div className='container mt-3'>
            <form className='w-50 mx-auto' onSubmit={handleLogin}>
                <strong>Login to view your notes!</strong>
                <div className="mt-3 mb-3">
                    <label htmlFor="username" className="form-label">Username</label>
                    <input type="text" className="form-control shadow-none" id="username" name='username' value={credential.username} onChange={handleChange} />
                    {errors.username && <small className="text-danger">{errors.username}</small>}
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control shadow-none" id="password" name='password' autoComplete="on" value={credential.password} onChange={handleChange} />
                    {errors.password && <small className="text-danger">{errors.password}</small>}
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login