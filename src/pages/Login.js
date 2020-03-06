import React, { useState } from "react";
import axios from "axios";
import { Redirect, useLocation } from "react-router-dom";
import FormErrors from "../components/FormErrors";
import FlashMessage from "../components/FlashMessage";

function Login(props) {
    const [formValues, setFormValues] = useState({email:"", password:""})
    const [redirectTo, setRedirectTo] = useState("");
    const [formErrors, setFormErrors] = useState([]);
    const location = useLocation();

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        try {
            const response = await axios.post("/user/login", formValues);

            if (response.status === 200) {
                console.log("logged in");

                props.setUser({
                    isLoggedIn: true,
                    email: response.data.email
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
                // Incorrect email password pair
                setFormErrors(["Incorrect email or password"]);
            } else {
                setRedirectTo("/serverError");
            }
        }
    };

    const validateForm = () => {
        const errors = [];
        if (formValues.email.length < 1) {
            errors.push("Please enter your email");
        }
        if (formValues.password.length < 1) {
            errors.push("Please enter your password");
        }

        if (errors.length > 0) {
            setFormErrors(errors);
            return false;
        }
        return true;
    };

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        });
    }

    if (redirectTo) {
        return <Redirect to={{ pathname: redirectTo }} />;
    }

    return (
        <div>
            <p>Login Page</p>
            {location.state && <FlashMessage flashMessage={location.state.flashMessage} />}
            <FormErrors formErrors={formErrors} />
            <form onSubmit={handleSubmit} method="post">
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={formValues.password}
                        onChange={handleChange}
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
