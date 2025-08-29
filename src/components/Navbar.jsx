import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
    // The state from react-redux is not available in this environment.
    // The cart count functionality has been removed to fix the compilation error.
    
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light py-2 sticky-top shadow-sm">
            <div className="container">
                {/* Logo with NavLink */}
                <NavLink className="navbar-brand d-flex align-items-center" to="/">
                    <img 
                        src="https://placehold.co/150x50/333333/FFFFFF?text=Vivid Pulse " 
                        alt="Vivid Pulse Logo" 
                        className="h-10 w-auto object-contain"
                    />
                    <span className="ml-2 font-semibold text-lg">🛒</span>
                </NavLink>
                <button 
                    className="navbar-toggler mx-3" 
                    type="button" 
                    data-toggle="collapse" 
                    data-target="#navbarSupportedContent" 
                    aria-controls="navbarSupportedContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* The nav links are now visible */}
                <div className="navbar-collapse md:flex" id="navbarSupportedContent">
                    <ul className="navbar-nav m-auto my-2 text-center">
                        <li className="nav-item">
                            <NavLink className="nav-link fs-5" to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link fs-5" to="/product">Products</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link fs-5" to="/about">About</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link fs-5" to="/contact">Contact</NavLink>
                        </li>
                    </ul>
                    <div className="buttons text-center">
                        <NavLink to="/login" className="btn btn-outline-dark m-2 fs-5"><i className="fa fa-sign-in-alt mr-1"></i> Login</NavLink>
                        <NavLink to="/register" className="btn btn-outline-dark m-2 fs-5"><i className="fa fa-user-plus mr-1"></i> Register</NavLink>
                        {/* Cart link without count */}
                        <NavLink to="/cart" className="btn btn-outline-dark m-2 fs-5"><i className="fa fa-shopping-cart mr-1"></i> Cart</NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;