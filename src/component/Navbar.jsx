import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../Config";

const Navbar = ({cart}) => {

    const { currentUser } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleSignOut = async () => {
        try {
            await signOut(auth);
            // Redirect to the login page after signing out
            navigate('/login');
        } catch (error) {
            console.error("Sign out error:", error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light py-3 shadow-sm">
                <div className="container">
                    <Link className="navbar-brand fw-bold fs-4" to="/"> Horlatech Store </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/products">Products</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" aria-current="page" to="/contact">Contact</Link>
                            </li>
                        </ul>
                        <div className="buttons">
                            {currentUser ?  <Link to="" className='btn btn-outline-dark' onClick={handleSignOut}><i className='fa fa-sign-out me-1'></i>Logout</Link> :  <Link to="/login" className='btn btn-outline-dark'><i className='fa fa-sign-in me-1'></i>Login</Link>}
                            <Link to="/cart" className='btn btn-outline-dark ms-2'><i className='fa fa-shopping-cart me-1'></i>
                            Cart ({cart.length === 0 ? "0" : cart.length})
                            <span></span>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
