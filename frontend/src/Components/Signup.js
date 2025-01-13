import React, { useState, useContext } from 'react'
import NoteContext from '../Context/Notes/NoteContext';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

  var context = useContext(NoteContext);
  var { signUp, updateAlert } = context; //Get signup and Alert functions from Context

  //Redirect to Add Note Route after signing up
  const navigate = useNavigate();
  const redirectToView = () => {
    navigate('/addNote');
  };

  //State to manage form input values and error
  const [userInfo, setUserInfo] = useState({ email: "", username: "", password: "", confPassword: "" });
  const [errors, setErrors] = useState({ email: "", username: "", password: "", confPassword: "" });

  //Signup User
  const handleSignup = async (e) => {
    e.preventDefault();

    // Validate inputs and set errors
    let formErrors = { email: "", username: "", password: "", confPassword: "" };

    const trimmedEmail = userInfo.email.trim();
    if (trimmedEmail.length === 0) {
      formErrors.email = "Email cannot be blank";
    }

    const trimmedUsername = userInfo.username.trim();
    if (trimmedUsername.length === 0) {
      formErrors.username = "Username cannot be blank";
    }

    const trimmedPassword = userInfo.password.trim();
    if (trimmedPassword.length === 0) {
      formErrors.password = "Password cannot be blank";
    }else if(trimmedPassword.length <=5){
      formErrors.password = "Password must be atleast 5 character long";
    }

    const trimmedConfPassword = userInfo.confPassword.trim();
    if (trimmedPassword.length > 0 && trimmedConfPassword.length === 0) {
      formErrors.confPassword = "Please confirm your password";
    } else if (trimmedConfPassword !== trimmedPassword) {
      formErrors.confPassword = "Passwords do not match";
    }

    // If there are errors, set them in state and prevent form submission
    if (formErrors.email || formErrors.username || formErrors.password || formErrors.confPassword) {
      setErrors(formErrors);
      return;
    }

    //Hit signup API
    const signupResponse = await signUp(userInfo);
    if (signupResponse.status) {
      //Show Success Alert
      updateAlert("success", "Signed up successfully!");
      redirectToView();
      setUserInfo({email:"", username: "", password: "", confPassword: "" });
    } else {
      //Show Error Alert
      updateAlert("danger", signupResponse.message);
    }
  }

  //Handle form input value change
  const handleChange = (e) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
    // Conditional error removal based on length condition
    if (e.target.name === "email" && e.target.value.length > 0) {
      setErrors((prevErrors) => ({ ...prevErrors, email: "" }));
    }
    if (e.target.name === "username" && e.target.value.length > 0) {
      setErrors((prevErrors) => ({ ...prevErrors, username: "" }));
    }
    if (e.target.name === "password" && e.target.value.length >= 5) {
      setErrors((prevErrors) => ({ ...prevErrors, password: "" }));
    }
    if (e.target.name === "confPassword" && e.target.value.length > 0) {
      // Check if the confirm password matches the password
      if (e.target.value !== userInfo.password) {
        setErrors((prevErrors) => ({ ...prevErrors, confPassword: "Passwords do not match" }));
      } else {
        setErrors((prevErrors) => ({ ...prevErrors, confPassword: "" }));
      }
    }
  }

  return (
    <div className='container mt-3'>
      <form className='w-50 mx-auto' onSubmit={handleSignup}>
        <strong>Signup to create your first Note!</strong>
        <div className="mt-3 mb-3">
          <label htmlFor="email" className="form-label">Email</label>
          <input type="email" className="form-control shadow-none" id="email" name='email' value={userInfo.email} onChange={handleChange} />
          {errors.email && <small className="text-danger">{errors.email}</small>}
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control shadow-none" id="username" name='username' value={userInfo.username} onChange={handleChange} />
          {errors.username && <small className="text-danger">{errors.username}</small>}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control shadow-none" id="password" name='password' autoComplete="on" value={userInfo.password} onChange={handleChange} />
          {errors.password && <small className="text-danger">{errors.password}</small>}
        </div>
        <div className="mb-3">
          <label htmlFor="confPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control shadow-none" id="confPassword" name='confPassword' autoComplete="on" value={userInfo.confPassword} onChange={handleChange} />
          {errors.confPassword && <small className="text-danger">{errors.confPassword}</small>}
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Signup
