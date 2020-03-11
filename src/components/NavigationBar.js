import React from "react";
import axios from "axios";
import { Navbar, Nav } from "react-bootstrap";

function NavigationBar(props) {
    const logout = event => {
        event.preventDefault();
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
                console.log(error);
            });
    };
    return (
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#home">UCL Team 39</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Home</Nav.Link>
                    <Nav.Link href="/register">Register</Nav.Link>
                    {!props.user.isLoggedIn && (
                        <Nav.Link href="/login">Login</Nav.Link>
                    )}
                    {!props.user.isLoggedIn && (
                        <Nav.Link href="/visitor">Visitor</Nav.Link>
                    )}
                    {props.user.isLoggedIn && (
                        <Nav.Link onClick={logout}>Logout</Nav.Link>
                    )}
                    {props.user.isLoggedIn && (
                        <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                    )}
                    {props.user.isLoggedIn && (
                        <Nav.Link href="/chatbot">Chatbot</Nav.Link>
                    )}
                    {props.user.isLoggedIn && (
                        <Nav.Link href="/history">History</Nav.Link>
                    )}
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavigationBar;
