import React, { useState } from "react";
import "../Chatbot.css"

function Chatbot(props) {
    const [userMessage, setUserMessage] = useState("");
    const [conversationHistory, setConversationHistory] = useState([]);

    const handleChange = event => {
        setUserMessage(event.target.value);
    };

    const handleSubmit = async event => {
        // preventing a default browser reloading
        event.preventDefault();
        if (!userMessage.trim()) return;

        var msg = {
            text: userMessage,
            user: "human"
        };

       setConversationHistory(
            [...conversationHistory, msg]
        );

        const response = await fetch("/api/inputText", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: userMessage,
                sessionID: "ryan"
            })
        });

        const data = await response.json();
        console.log(data);

        msg = {
            text: data.message,
            user: "ai"
        };

        setConversationHistory( [...conversationHistory, msg])
        

        setUserMessage("");
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

    return (
        <div>
            <h1>Compliance Expert, your friendly assistant</h1>
            <div className="chat-window">
                <div className="conversationHistory-view">{chat}</div>
                <div className="message-box">
                    <form onSubmit={handleSubmit}>
                        <input
                            value={userMessage}
                            onInput={handleChange}
                            className="text-input"
                            type="text"
                            autoFocus
                            placeholder="Type your message and hit Enter to send"
                        />
                        <button
                            type="button"
                            className="send-button"
                            onClick={handleSubmit}
                        >
                            Send
                        </button>
                    </form>
                </div>
            </div>
            <br></br>
        </div>
    );
}

export default Chatbot;
