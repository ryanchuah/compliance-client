import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";
import LoadingScreen from "./LoadingScreen";

function Suggestions(props) {
    const [suggestions, setSuggestions] = useState([]);
    const [suggestionsIsLoading, setSuggestionsIsLoading] = useState(true);

    useEffect(() => {
        async function fetchUserSuggestionData() {
            const result = await axios.get("/api/userData/suggestionData");
            setSuggestions(result.data);
            setSuggestionsIsLoading(false);
        }
        fetchUserSuggestionData();
    }, [suggestions.length]);

    if (suggestionsIsLoading) return <LoadingScreen />;

    if (suggestions) {
        return (
            <div>
                <h1 className="my-4">Suggestions</h1>
                <Container>
                    <Row className="font-weight-bold">
                        <Col>Your situation</Col>
                        <Col>Action needed</Col>
                        <Col>Resource</Col>
                    </Row>

                    {suggestions.map((suggestion) => {
                        return suggestion[1].map((_, index) => (
                            <Row key={uuidv4()} className="mb-3">
                                {/*Situation*/}
                                <Col>{suggestion[0]}</Col> 
                                {/*Action needed*/}
                                <Col>{suggestion[1][index]}</Col>{" "}
                                <Col>
                                    {/*Resource*/}
                                    <a
                                        key={uuidv4()}
                                        href={suggestion[3][index].link}
                                    >
                                        {suggestion[3][index].value}
                                    </a>
                                </Col>
                            </Row>
                        ));
                    })}
                </Container>
            </div>
        );
    } else {
        return <h1>Suggestions</h1>;
    }
}

export default Suggestions;
