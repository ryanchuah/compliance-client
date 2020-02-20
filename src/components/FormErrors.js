import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

function FormErrors(props) {
    const [errors, setErrors] = useState([]);

    useEffect(() => setErrors(props.formErrors), [props.formErrors]);

    return errors.map(error => {
        return (
            <Alert
                key={error}
                variant="danger"
                onClose={() => {
                    const updatedErrors = errors.filter(err => err !== error);
                    setErrors(updatedErrors);
                }}
                dismissible
            >
                {error}
            </Alert>
        );
    });
}

export default FormErrors;
