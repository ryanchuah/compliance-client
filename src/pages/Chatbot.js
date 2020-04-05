import React, { useState, useEffect } from "react";
import "../Chatbot.css";
import { Form, Button } from "react-bootstrap";
import { animateScroll } from "react-scroll";
import "../App";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import LoadingScreen from "./LoadingScreen";

function Chatbot(props) {
    const [userMessage, setUserMessage] = useState("");
    const [conversationHistory, setConversationHistory] = useState([]);
    const [historyIsLoading, setHistoryIsLoading] = useState(true);
    const [isStartOfNewSession, setIsStartOfNewSession] = useState(true);
    useEffect(() => {
        async function fetchHistory() {
            const resultHistory = [];
            var history = await axios.get("/api/userData/history");
            history = history.data;
            var n = 0;
            for (let i = 0; i < history.length; i++) {
                if (i !== 3 * n) {
                    // ignore timestamps
                    if (i == 3 * n + 1) {
                        var msg = {
                            text: history[i],
                            user: "human"
                        };
                        resultHistory.push(msg);
                    } else {
                        var msg = {
                            text: history[i],
                            user: "ai"
                        };
                        resultHistory.push(msg);
                        n += 1;
                    }
                }
            }
            setConversationHistory(resultHistory);
            setHistoryIsLoading(false);
            scrollToBottom(200);
        }
        if (!(props.user && props.user.sessionID)) {
            // user is guest
            setHistoryIsLoading(false);
            return;
        }
        if (historyIsLoading) {
            fetchHistory();
        }
    }, [historyIsLoading]);

    if (props.user && props.user.sessionID) {
        // user is logged in
        var sessionID = props.user.sessionID;
    } else {
        //user is visitor
        if (!localStorage.getItem("sessionID")) {
            localStorage.setItem("sessionID", uuidv4());
        }
        var sessionID = localStorage.getItem("sessionID");
    }

    useEffect(() => {
        scrollToBottom(500);
    }, [conversationHistory[conversationHistory.length - 1]]);

    const handleChange = event => {
        setUserMessage(event.target.value);
    };

    const handleSubmit = async event => {
        // preventing a default browser reloading
        event.preventDefault();
        if (!userMessage.trim()) {
            return;
        }

        var msg = {
            text: userMessage,
            user: "human"
        };
        setUserMessage("");

        setConversationHistory(conversationHistory => [
            ...conversationHistory,
            msg
        ]);

        const response = await fetch("/api/inputText", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: userMessage,
                sessionID,
                isStartOfNewSession
            })
        });
        setIsStartOfNewSession(false);

        const data = await response.json();
        console.log(data);

        msg = {
            text: data.message,
            user: "ai"
        };

        setConversationHistory(conversationHistory => [
            ...conversationHistory,
            msg
        ]);
    };

    const ChatBubble = (text, i, className) => {
        return (
            // key for react's internal id's
            <div
                key={`${className}-${i}`}
                className={`${className} chat-bubble`}
            >
                <span className="chat-content">{text}</span>
            </div>
        );
    };

    const chat = conversationHistory.map((e, index) =>
        ChatBubble(e.text, index, e.user)
    );

    function scrollToBottom(duration) {
        animateScroll.scrollToBottom({
            containerId: "chat-container",
            duration: duration || null
        });
    }

    if (historyIsLoading) {
        return <LoadingScreen />;
    }

    return (
        <div style={{ maxHeight: "100vh" }}>
            <h1>Start by saying hi!</h1>
            <div className="chat-window">
                <div className="conversationHistory-view" id="chat-container">
                    {chat}
                </div>
                <Form onSubmit={handleSubmit} className="message-box">
                    <Form.Control
                        type="text"
                        placeholder="Type here..."
                        value={userMessage}
                        onChange={handleChange}
                        style={{ marginRight: "3%" }}
                    />

                    <Button variant="primary" type="submit">
                        Enter
                    </Button>
                </Form>
            </div>
        </div>
    );
}

export default Chatbot;
