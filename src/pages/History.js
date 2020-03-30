import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

function History(props) {
    const [user, setUser] = useState({});
    const [conversationHistory, setConversationHistory] = useState([]);

    useEffect(() => {
        console.log(999, props.user);

        setUser(props.user);
    }, [props.user.isLoggedIn]);

    useEffect(() => {
        const fetchHistory = async () => {
            const history = await axios.get("/api/userData/history");
            setConversationHistory(history.data);
        };
        fetchHistory();
    }, [conversationHistory.length]);
    var prevMessageTime = "";

    return (
        <div>
            <h2>Compliance Bot Conversation History</h2>
            {conversationHistory.map((_, i) => {
                if (i % 3 == 0) {
                    const messageTime = conversationHistory[i];
                    const messageDate = messageTime.substring(0, 10);
                    const messageHoursMinutes = messageTime.substring(11, 16);
                    if (messageDate + messageHoursMinutes !== prevMessageTime) {
                        prevMessageTime = messageDate + messageHoursMinutes;
                        return (
                            <h4 key={uuidv4()}>
                                {messageDate + " " + messageHoursMinutes}
                            </h4>
                        );
                    }
                } else if (i % 2 == 0) {
                    return (
                        <p key={uuidv4()}>
                            <b>{props.user.userData.name}:</b>{" "}
                            {conversationHistory[i]}
                        </p>
                    );
                } else {
                    return (
                        <p key={uuidv4()}>
                            <b>Bot:</b> {conversationHistory[i]}
                        </p>
                    );
                }
            })}
        </div>
    );
}

export default History;
