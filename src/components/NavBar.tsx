import { NavLink } from "react-router-dom";
import { useState } from "react";
import GoogleLogin from "./GoogleLogin";
import "./NavBar.css";

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('authToken'));

    const handleSignOut = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    return (
        <nav className="navbar">
            <div className="navbar-google">
                {isLoggedIn
                    ? <button className="google-signin-btn signout-btn" onClick={handleSignOut}>Sign out</button>
                    : <GoogleLogin />
                }
            </div>
            <div className="navbar-links">
                <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>
                    Create
                </NavLink>
                <NavLink to="/gallery" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>
                    Gallery
                </NavLink>
            </div>
        </nav>
    );
}
