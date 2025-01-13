import React, { useContext } from 'react'
import {
    Link,
    useLocation
} from "react-router-dom";
import "./Navbar.css";
import { useNavigate } from 'react-router-dom';
import NoteContext from '../Context/Notes/NoteContext';


export default function Navbar() {
    var context = useContext(NoteContext);
    var { updateAlert } = context
    var location = useLocation();

    //Redirect to Login Route after logout
    const navigate = useNavigate();
    const redirectToLogin = () => {
        navigate('/login');
    };

    //Logout Function Login
    const handleLogout = () => {
        localStorage.removeItem("iNotebookLoginAuth");
        updateAlert("success", "Logged out successfully");
        redirectToLogin();
    }

    return (
        <nav className="navbar navbar-expand-md sticky-top navbar-dark bg-dark">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">iNotebook</Link>
                {/* <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button> */}
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="offcanvas offcanvas-end" id="offcanvasNavbar" style={{ backgroundColor: 'rgba(33, 37, 41, 1)' }}>
                    <div className="offcanvas-header" style={{ backgroundColor: 'grey' }}>
                        <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body justify-content-between">
                        <ul className="navbar-nav mr-auto align-items-center">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/addNote' ? "active" : ""}`} to="/addNote">Add Note</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/' ? "active" : ""}`} to="/">View Notes</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem("iNotebookLoginAuth") ? <div className='d-flex align-items-center loginSignUpBtn'>
                            <button type="button" className="btn btn-primary loginBtn btn-sm mx-2">
                                <Link className="nav-link pt-0 pb-0" to="/login">Login</Link>
                            </button>
                            <button type="button" className="btn btn-secondary btn-sm mx-2">
                                <Link className="nav-link pt-0 pb-0" to="/signup">Signup</Link>
                            </button>
                        </div> : <button type="button" className="btn btn-primary btn-sm logoutBtn" onClick={handleLogout}>
                            Logout
                        </button>}
                    </div>
                </div>
            </div>
        </nav>
    )
}