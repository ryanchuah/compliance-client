import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import FormErrors from "../components/FormErrors";
import { Form, Button, Col } from "react-bootstrap";

function Register(props) {
    const [redirect, setRedirect] = useState("");
    const [formValues, setFormValues] = useState({
        name: "",
        email: "",
        password: ""
    });
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

        if (formValues.passwordReenter !== formValues.password) {
            errors.push("Your passwords do not match");
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
            <h3 className="my-3">Register</h3>

            <FormErrors formErrors={formErrors} />
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formBasicName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                        name="name"
                        type="text"
                        placeholder="Enter name"
                        value={formValues.name}
                        onChange={handleChange}
                    />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                        name="email"
                        type="email"
                        placeholder="Enter email"
                        value={formValues.email}
                        onChange={handleChange}
                    />
                    <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Row>
                        <Col>
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                name="password"
                                type="password"
                                placeholder="Password"
                                value={formValues.password}
                                onChange={handleChange}
                            />
                        </Col>
                        <Col>
                            <Form.Label>Re-enter Password</Form.Label>
                            <Form.Control
                                name="passwordReenter"
                                type="password"
                                placeholder="Re-enter password"
                                value={formValues.passwordReenter}
                                onChange={handleChange}
                            />
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Register
                </Button>
            </Form>
        </div>
    );
}

export default Register;
