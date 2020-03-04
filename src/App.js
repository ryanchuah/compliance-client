import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Index from "./pages/Index";
import Register from "./pages/Register";
import NavigationBar from "./components/NavigationBar";
import Dashboard from "./pages/Dashboard";
import ServerError from "./pages/ServerError";
import Chatbot from "./pages/Chatbot";
import axios from "axios";
import History from "./pages/History"

function App() {
    const [user, setUser] = useState({ isLoggedIn: false, username: null });

    useEffect(() => {
        getUser();
        console.log("user is: ");
        console.log(user);
    }, [user.isLoggedIn]);

    function getUser() {
        axios.get("/user/").then(response => {
            if (response.data.user) {
                console.log(
                    "Get User: There is a user saved in the server session: "
                );
                console.log(response.data.user);

                setUser({
                    isLoggedIn: true,
                    username: response.data.user
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
            <NavigationBar user={user} setUser={setUser} />
            {user.loggedIn && <p>Join the party, {user.username}!</p>}
            <Route
                exact
                path="/"
                render={props => {
                    return <Index user={user} />;
                }}
            />

            {user.isLoggedIn ? (
                <React.Fragment>
                    <Route
                        exact
                        path="/dashboard"
                        render={props => {
                            return <Dashboard user={user} />;
                        }}
                    />
                    <Route
                    exact
                    path="/chatbot"
                    render={props => {
                        return <Chatbot user={user} />;
                    }}
                />
                <Route
                    exact
                    path="/history"
                    render={props => {
                        return <History user={user} />;
                    }}
                />
                </React.Fragment>
            ) : 
                (
            <React.Fragment>
                <Route
                    exact
                    path="/dashboard"
                    render={props => {
                        return <p>Not logged in</p>;
                    }}
                />
                <Route
                    exact
                    path="/chatbot"
                    render={props => {
                        return <p>Not logged in</p>;
                    }}
                />
                <Route
                    exact
                    path="/history"
                    render={props => {
                        return <p>Not logged in</p>;
                    }}
                />

            </React.Fragment>
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

            <Route
                exact
                path="/serverError"
                render={props => {
                    return <ServerError />;
                }}
            />
        </Router>
    );
}

export default App;
