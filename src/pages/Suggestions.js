import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row, Col } from "react-bootstrap";
import { v4 as uuidv4 } from "uuid";

function Suggestions(props) {
    const [suggestions, setSuggestions] = useState([]);
    const [userSuggestionData, setUserSuggestionData] = useState({});
    const suggestionObj = {
        mhra: {
            class: [
                {
                    value: "Class I",
                    situation:
                        "Your Medical Device belongs to Class I under MHRA rules",
                    actionNeeded: [
                        "carry out a clinical evaluation as described in Annex X of the MDD",
                        "notify MHRA of any proposals to carry out a clinical investigation to demonstrate safety and performance"
                    ],
                    source: ["x", "x"]
                }
            ]
        }
    };

    useEffect(() => {
        async function fetchUserSuggestionData() {
            const result = await axios.get("/api/userData/suggestionData");
            setUserSuggestionData(result.data);
        }
        fetchUserSuggestionData();
    }, [Object.keys(userSuggestionData).length]);

    useEffect(() => {
        // check mhra class
        if (userSuggestionData) {
            for (const obj of suggestionObj.mhra.class) {

                if (obj.value === userSuggestionData.mhraClass) {
                    setSuggestions(prevSuggestions => [
                        ...prevSuggestions,
                        [obj.situation, obj.actionNeeded, obj.source]
                    ]);
                }
            }
        }
    }, [Object.keys(userSuggestionData).length]);

    if (suggestions){
        return (
            <div>
                <h1>Suggestions</h1>
                <Container>
                    <Row className="font-weight-bold">
                        <Col>Your situation</Col>
                        <Col>Action needed</Col>
                        <Col>Source</Col>
                    </Row>
    
                    {suggestions.map(suggestion => {
                        return (
                            <Row key={uuidv4()}>
    
                                <Col>{suggestion[0]}</Col>
                                <Col>
                                    {suggestion[1].map(action => <p>{action}</p>)}
                                </Col>
                                <Col>
                                    {suggestion[2].map(source => <p>{source}</p>)}
                                </Col>
                            </Row>
                        );
                    })}
                </Container>
            </div>
        );
    } else{
        return <h1>Suggestions</h1>
    }
}

export default Suggestions;
