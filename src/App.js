import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Visitor from "./pages/Visitor";
import Register from "./pages/Register";
import NavigationBar from "./components/NavigationBar";
import Dashboard from "./pages/Dashboard";
import ServerError from "./pages/ServerError";
import Chatbot from "./pages/Chatbot";
import axios from "axios";
import History from "./pages/History";
import Suggestions from "./pages/Suggestions";

var refreshChatbot = false;

function App() {
    const [user, setUser] = useState({ isLoggedIn: undefined, username: null });

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

    if (user.isLoggedIn === undefined) {
        var activeRoutes = (
            <React.Fragment>
                <Route
                    exact
                    path="/dashboard"
                    render={props => {
                        return <p>Loading...</p>;
                    }}
                />
                <Route
                    exact
                    path="/chatbot"
                    render={props => {
                        window.refreshChatbot = true;
                        return <p>Loading...</p>;
                    }}
                />
                <Route
                    exact
                    path="/history"
                    render={props => {
                        return <p>Loading...</p>;
                    }}
                />
                <Route
                    exact
                    path="/suggestions"
                    render={props => {
                        return <p>Loading...</p>;
                    }}
                />
            </React.Fragment>
        );
    } else if (user.isLoggedIn) {
        var activeRoutes = (
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
                        window.refreshChatbot = true;
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
                <Route
                    exact
                    path="/suggestions"
                    render={props => {
                        return <Suggestions user={user} />;
                    }}
                />
            </React.Fragment>
        );
    } else {
        var activeRoutes = (
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
                {/* <Route
            exact
            path="/suggestions"
            render={props => {
                return <p>Not logged in</p>;
            }}
        /> */}
                <Route
                    exact
                    path="/suggestions"
                    render={props => {
                        return <Suggestions user={user} />;
                    }}
                />
            </React.Fragment>
        );
    }
    return (
        <Router>
            <NavigationBar user={user} setUser={setUser} />
            {user.loggedIn && <p>Join the party, {user.username}!</p>}
            <div className="mx-5">
                <Route
                    exact
                    path="/"
                    render={props => {
                        return <Login setUser={setUser}/>;
                    }}
                />

                {activeRoutes}

                <Route
                    exact
                    path="/login"
                    render={props => {
                        return <Login setUser={setUser} />;
                    }}
                />

                <Route
                    exact
                    path="/visitor"
                    render={props => {
                        return <Visitor />;
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
            </div>
        </Router>
    );
}

export default App;
