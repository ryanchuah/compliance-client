import React, {useState} from "react";
import axios from "axios";
import { Navbar, Nav } from "react-bootstrap";
import { useHistory } from "react-router-dom";

function NavigationBar(props) {
    const history = useHistory();
    const logout = event => {
        event.preventDefault();
        axios
            .post("/user/logout")
            .then(response => {
                console.log(response.data);
                if (response.status === 200) {
                    props.setUser({
                        loggedIn: false,
                        user: null,
                        sessionID: null
                    });
                    props.setUserIsLoading(true)
                    history.push("/login")
                }
            })
            .catch(error => {
                console.log("Logout error");
                console.log(error);
            });
    };
    if(props.userIsLoading){
        var activeLinks = (
            <React.Fragment>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/chatbot">Chatbot</Nav.Link>
            </React.Fragment>
        );
    }
    else if (props.user.isLoggedIn) {
        var activeLinks = (
            <React.Fragment>
                <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                <Nav.Link href="/chatbot">Chatbot</Nav.Link>
                <Nav.Link href="/history">History</Nav.Link>
                <Nav.Link href="/suggestions">Suggestions</Nav.Link>
                <Nav.Link onClick={logout}>Logout</Nav.Link>
            </React.Fragment>
        );
    } else {
        var activeLinks = (
            <React.Fragment>
                <Nav.Link href="/login">Login</Nav.Link>
                <Nav.Link href="/register">Register</Nav.Link>
                <Nav.Link href="/chatbot">Guest Chatbot</Nav.Link>
                <Nav.Link href="/disclaimer">Disclaimer</Nav.Link>
            </React.Fragment>
        );
    }
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">UCL Team 39</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    {activeLinks}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
