import React, { useState, useEffect } from "react";
import { Alert } from "react-bootstrap";

function FlashMessage(props) {
    const [flashMessage, setFlashMessage] = useState([]);

    useEffect(() => setFlashMessage(props.flashMessage), [props.flashMessage]);

    if (flashMessage !== undefined && flashMessage.successMessage !== "") {
        return <Alert variant="success">{flashMessage.successMessage}</Alert>;
    }

    if (flashMessage !== undefined && flashMessage.failureMessage !== "") {
        return <Alert variant="danger">{flashMessage.failureMessage}</Alert>;
    }

    return null;
}

export default FlashMessage;
