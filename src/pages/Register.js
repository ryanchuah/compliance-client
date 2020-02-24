import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import FormErrors from "../components/FormErrors";

function Register(props) {
    const [redirect, setRedirect] = useState("");
    const [formValues, setFormValues] = useState({name:"",email:"",password:""});
    const [formErrors, setFormErrors] = useState([]);

    const handleSubmit = async e => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        try {
            const response = await axios.post("/user/register", formValues);
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
        } catch (err) {
            console.log("sign up server error");
            console.log(err);
        }
    };
    const validateForm = () => {
        const errors = [];
        if (formValues.name.length < 1) {
            errors.push("Please enter your name");
        }
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
                    <label>Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formValues.name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={formValues.username}
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
                    <input type="submit" value="Register" />
                </div>
            </form>
        </div>
    );
}

export default Register;
