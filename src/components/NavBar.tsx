import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import GoogleLogin from "./GoogleLogin";
import "./NavBar.css";

export default function NavBar() {
    const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('authToken'));

    /* Automatically checks after user is signed into Google to re-render the sign in button to display the sign out button*/
    useEffect(() => {
        const sync = () => setIsLoggedIn(!!localStorage.getItem('authToken'));
        window.addEventListener('authChange', sync);
        return () => window.removeEventListener('authChange', sync);
    }, []);

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
                <span id="sign-in-to-save">Sign in to save and view your Madlibs!</span>
            </div>
            <div className="navbar-links">
                <NavLink to="/" end className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>
                    Create
                </NavLink>
                <NavLink to="/gallery" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>
                    Gallery
                </NavLink>
                {isLoggedIn
                    ? <NavLink to="/myMadlibs" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>
                        My Madlibs
                      </NavLink>
                    : <span className="nav-link nav-link-disabled"></span>
                }

            </div>
        </nav>
    );
}
