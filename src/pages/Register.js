import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import FormErrors from "../components/FormErrors";

function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirect, setRedirect] = useState("");
    const [formErrors, setFormErrors] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            console.log("posting now");

            const response = await axios.post("/user/register", {
                username,
                password
            });

            console.log(response);
            if (response.status === 200) {
                setRedirect({
                    pathname: "/login",
                    state: {
                        flashMessage: {
                            successMessage: "You have successfully signed up"
                        }
                    }
                });
            }
            // if (response.data) {
            //     console.log("successful signup");
            //     setRedirectTo("/register");
            // } else {
            //     console.log("sign up error");
            // }
        } catch (err) {
            console.log("sign up server error");

            console.log(err);
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

    if (redirect.pathname) {
        return (
            <Redirect
                to={{
                    pathname: redirect.pathname,
                    state: redirect.state
                }}
            />
        );
    }

    return (
        <div>
            <p>Register Page</p>
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
                    <input type="submit" value="Register" />
                </div>
            </form>
        </div>
    );
}

export default Register;
