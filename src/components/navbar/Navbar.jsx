import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/styles/navbar.css";

export const Navbar = () => {
    const navigate = useNavigate();
    const [isLogin, setIsLogin] = useState(false);

    useEffect(() => {
        const user = localStorage.getItem("user");
        setIsLogin(!!user);
    }, []);

    const handleHome = () => navigate(`/home`);

    const handleLogout = () => {
        localStorage.removeItem("user");
        setIsLogin(false);
        navigate("/auth");
    };

    const handleLogin = () => {
        navigate("/auth");
    };

    return (
        <nav className="navbar">
            <h2 className="navbar-title">Categorías</h2>
            <div>
                <button onClick={handleHome} className="navbar-button">Inicio</button>
                {isLogin ? (
                    <button onClick={handleLogout} className="navbar-button">Logout</button>
                ) : (
                    <button onClick={handleLogin} className="navbar-button">Login</button>
                )}
            </div>
        </nav>
    );
};
