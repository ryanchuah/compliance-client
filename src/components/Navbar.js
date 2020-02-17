import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Navbar(props) {
    const logout = event => {
        event.preventDefault();
        console.log("logging out");
        axios
            .post("/user/logout")
            .then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    props.setUser({
                        loggedIn: false,
                        username: null
                    });
                }
            })
            .catch(error => {
                console.log("Logout error");
            });
    };
    return (
        <div>
            <p>Navbar</p>
            <ul>
                <li>
                    <a href="/">Home</a>
                </li>
                <li>
                    <a href="/login">Login</a>
                </li>
                <li>
                    <a href="/register">Register</a>
                </li>
                <Link
                    to="#"
                    className="btn btn-link text-secondary"
                    onClick={logout}
                >
                    Logout
                </Link>
            </ul>
        </div>
    );
}

export default Navbar;
