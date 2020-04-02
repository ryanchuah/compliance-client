import React, { useState, useEffect } from "react";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";
import LoadingScreen from "./LoadingScreen";
function History(props) {
    const [conversationHistory, setConversationHistory] = useState([]);
    const [historyIsLoading, setHistoryIsLoading] = useState(true);
    
    useEffect(() => {
        const fetchHistory = async () => {
            const history = await axios.get("/api/userData/history");
            setConversationHistory(history.data);
            setHistoryIsLoading(false);
        };
        fetchHistory();
    }, [conversationHistory.length]);

    if (historyIsLoading) return <LoadingScreen />;

    var prevMessageTime = "";
    var n = 0;
    return (
        <div>
            <h1 className="my-4">Conversation History</h1>

            {conversationHistory.map((_, i) => {
                if (i == 3 * n) {
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
                } else if (i == 3 * n + 1) {
                    return (
                        <p key={uuidv4()}>
                            <b>{props.user.userData.name}:</b>{" "}
                            {conversationHistory[i]}
                        </p>
                    );
                } else if (i == 3 * n + 2) {
                    n += 1;
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
