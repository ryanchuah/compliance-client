import React, { useState } from "react";
import axios from "axios";
import { useLocation, useHistory } from "react-router-dom";
import FormErrors from "../components/FormErrors";
import FlashMessage from "../components/FlashMessage";
import { Form, Button } from "react-bootstrap"

function Login(props) {
    const [formValues, setFormValues] = useState({ email: "", password: "" });
    const [formErrors, setFormErrors] = useState([]);
    const location = useLocation();
    const history = useHistory();


    const handleSubmit = async e => {
        e.preventDefault();
        if (!validateForm()) return;
        try {
            const response = await axios.post("/user/login", formValues);

            if (response.status === 200) {
                console.log("logged in: ");
                console.log(response);
                
                props.setUser({
                    isLoggedIn: true,
                    userData: response.data.user,
                    sessionID: response.data.sessionID
                });
                history.push("/dashboard")
            } else {
                console.log("not logged in");
                console.log(response.status);
            }
        } catch (err) {
            console.log("login error");
            console.log(err);

            if (err.response && err.response.status === 401) {
                // Incorrect email password pair
                setFormErrors(["Incorrect email or password"]);
            } else {
                history.push("/serverError");
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
    };
   
    return (
        <div>
            <h1 className="mt-3">Speeding up MHRA, NICE, and NHSD Software Compliance</h1>
            <h3 className="my-3">Login</h3>
            {location.state && (
                <FlashMessage flashMessage={location.state.flashMessage} />
            )}
            <FormErrors formErrors={formErrors} />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control name="email" type="email" placeholder="Enter email" value={formValues.email}
                        onChange={handleChange} /> 
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control name="password" type="password" placeholder="Password" value={formValues.password}
                        onChange={handleChange} />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
}

export default Login;
