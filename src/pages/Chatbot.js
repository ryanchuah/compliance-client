import React, { useState, useEffect } from "react";
import "../Chatbot.css";
import { Form, Button } from "react-bootstrap";
import { animateScroll } from "react-scroll";

function Chatbot() {
    const [userMessage, setUserMessage] = useState("");
    const [conversationHistory, setConversationHistory] = useState([]);

    useEffect(()=>{
        scrollToBottom()
    },[conversationHistory[conversationHistory.length-1]])

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
                sessionID: "ryan"
            })
        });

        const data = await response.json();

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

    function scrollToBottom() {
        animateScroll.scrollToBottom({
            containerId: "chat-container"
        });
    }

    const formStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1vh 10%",
        height: "20%"
    };

    return (
        <div style={{ maxHeight: "100vh" }}>
            <h1>Compliance Expert, your friendly assistant</h1>
            <div className="chat-window">
                <div className="conversationHistory-view" id="chat-container">
                    {chat}
                </div>
                <Form onSubmit={handleSubmit} style={formStyle}>
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
            <br></br>
        </div>
    );
}

export default Chatbot;
