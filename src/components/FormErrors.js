import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

function FormErrors(props) {
    const [errors, setErrors] = useState([]);

    useEffect(
        () =>
            setErrors(
                props.formErrors.map(message => ({
                    message,
                    show: true
                }))
            ),
        [props.formErrors]
    );

    return errors.map(error => {
        return (
            <Alert
                key={error.message}
                variant="danger"
                onClose={() => {
                    const updatedErrors = errors.filter(
                        err => err.message != error.message
                    );
                    setErrors(updatedErrors);
                }}
                dismissible
            >
                {error.message}
            </Alert>
        );
    });
}

export default FormErrors;
