import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import axios from "axios";

function App() {
    const [user, setUser] = useState({ isLoggedIn: null, username: null });

    useEffect(() => {
        getUser();
        console.log("user is: ");
        console.log(user);
    }, [user.isLoggedIn]);

    function getUser() {
        axios.get("/user/").then(response => {
            console.log("Get user response: ");
            console.log(response.data);
            if (response.data.user) {
                console.log(
                    "Get User: There is a user saved in the server session: "
                );

                setUser({
                    isLoggedIn: true,
                    username: response.data.user.username
                });
            } else {
                console.log("Get user: no user");
                setUser({
                    isLoggedIn: false,
                    username: null
                });
            }
        });
    }
    return (
        <Router>
            <Navbar user={user} setUser={setUser} />
            {user.loggedIn && <p>Join the party, {user.username}!</p>}
            <Route
                exact
                path="/"
                render={props => {
                    return <Index user={user} />;
                }}
            />

            {user.isLoggedIn ? (
                <Route
                    exact
                    path="/dashboard"
                    render={props => {
                        return <Dashboard user={user} />;
                    }}
                />
            ) : (
                <Route
                    exact
                    path="/dashboard"
                    render={props => {
                        return <p>Not logged in</p>;
                    }}
                />
            )}

            <Route
                exact
                path="/login"
                render={props => {
                    return <Login setUser={setUser} />;
                }}
            />

            <Route
                exact
                path="/register"
                render={props => {
                    return <Register />;
                }}
            />
        </Router>
    );
}

export default App;
