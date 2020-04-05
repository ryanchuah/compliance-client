import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NavigationBar from "./components/NavigationBar";
import Dashboard from "./pages/Dashboard";
import ServerError from "./pages/ServerError";
import Disclaimer from "./pages/Disclaimer";
import Chatbot from "./pages/Chatbot";
import axios from "axios";
import History from "./pages/History";
import Suggestions from "./pages/Suggestions";
import LoadingScreen from "./pages/LoadingScreen";

function App() {
    const [user, setUser] = useState({
        isLoggedIn: undefined,
        user: null,
        sessionID: null
    });
    const [userIsLoading, setUserIsLoading] = useState(true)

    useEffect(()=>{
        if (userIsLoading){
            axios.get("/user/").then(response => {
                if (response.data.user) {
                    console.log(
                        "Get User: There is a user saved in the server session: "
                    );
                    console.log(response.data.user);
    
                    setUser({
                        isLoggedIn: true,
                        userData: response.data.user,
                        sessionID: response.data.sessionID
                    });
                } else {
                    console.log("Get user: no user");
                    setUser({
                        isLoggedIn: false,
                        user: null,
                        sessionID: null
                    });
                }
                setUserIsLoading(false)
            });
        }
    }, [userIsLoading])

    if (userIsLoading) {
        var activeRoutes = (
            <React.Fragment>
                <Route
                    exact
                    path={[
                        "/dashboard",
                        "/chatbot",
                        "/history",
                        "/suggestions"
                    ]}
                    render={props => {
                        return <LoadingScreen />;
                    }}
                />
            </React.Fragment>
        );
    } else if (user.isLoggedIn) {
        var activeRoutes = (
            <React.Fragment>
                <Route
                    exact
                    path={["/", "/dashboard", "/login", "/register"]}
                    render={props => {
                        return <Dashboard user={user} userIsLoading={userIsLoading}/>;
                    }}
                />
                <Route
                    exact
                    path="/history"
                    render={props => {
                        return <History user={user} userIsLoading={userIsLoading} />;
                    }}
                />
                <Route
                    exact
                    path="/suggestions"
                    render={props => {
                        return <Suggestions user={user} userIsLoading={userIsLoading} />;
                    }}
                />
                <Route
                    exact
                    path="/chatbot"
                    render={props => {
                        window.refreshChatbot = true;
                        return <Chatbot user={user} userIsLoading={userIsLoading} />;
                    }}
                />
            </React.Fragment>
        );
    } else {
        var activeRoutes = (
            <React.Fragment>
                <Route
                    exact
                    path={["/", "/login"]}
                    render={props => {
                        return <Login setUser={setUser} />;
                    }}
                />
                <Route
                    exact
                    path="/chatbot"
                    render={props => {
                        window.refreshChatbot = true;
                        return <Chatbot user={user} userIsLoading={userIsLoading} />;
                    }}
                />
                <Route
                    exact
                    path="/dashboard"
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
                        return <Suggestions user={user} userIsLoading={userIsLoading} />;
                    }}
                />
                <Route
                    exact
                    path="/register"
                    render={props => {
                        return <Register />;
                    }}
                />
            </React.Fragment>
        );
    }
    return (
        <Router>
            <NavigationBar user={user} userIsLoading={userIsLoading} setUser={setUser} setUserIsLoading={setUserIsLoading}/>
            {user.loggedIn && <p>Join the party, {user.username}!</p>}
            <div className="mx-5">
                {activeRoutes}
                <Route
                    exact
                    path="/disclaimer"
                    render={props => {
                        return <Disclaimer />;
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
