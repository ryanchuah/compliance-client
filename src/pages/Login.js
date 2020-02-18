import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import FormErrors from "../components/FormErrors";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirectTo, setRedirectTo] = useState("");
    const [formErrors, setFormErrors] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = await axios.post("/user/login", {
                username,
                password
            });

            if (response.status === 200) {
                console.log("logged in");

                props.setUser({
                    isLoggedIn: true,
                    username: response.data.username
                });
                setRedirectTo("/dashboard");
            } else {
                console.log("not logged in");
                console.log(response.status);
            }
        } catch (err) {
            console.log("login error");
            console.log(err.response);

            if (err.response.status === 401) {
                // Incorrect username password pair
            }
        }
    };

    const validateForm = () => {
        const errors = [];
        if (username.length < 1) {
            errors.push("Please enter your username");
        }
        if (password.length < 1) {
            errors.push("Please enter your password");
        }

        if (errors.length > 0) {
            setFormErrors(errors);
            return false;
        }
        return true;
    };

    if (redirectTo) {
        return <Redirect to={{ pathname: redirectTo }} />;
    }

    return (
        <div>
            <p>Login Page</p>
            <FormErrors formErrors={formErrors} />
            <form onSubmit={handleSubmit} method="post">
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" value="Login" />
                </div>
            </form>
        </div>
    );
}

export default Login;
