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
            setHistoryIsLoading(false);
            setConversationHistory(history.data);
        };
        if (historyIsLoading){
            fetchHistory();
        }
    }, [conversationHistory.length]);

    if (historyIsLoading) return <LoadingScreen />;

    var prevMessageTime = "";
    var n = 0;
    return (
        <div>
            <h1 className="my-4">Conversation History</h1>

            {conversationHistory.map((_, i) => {
                // history array is stored in groups of 3
                // 0th element: timestamp, 1st element: user message, 2nd element: bot message
                // this pattern repeats for elements number 3,4,5 and 6,7,8 and so on
                if (i == 3 * n) { // timestamp
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
                } else if (i == 3 * n + 1) { // user message
                    return (
                        <p key={uuidv4()}>
                            <b>{props.user.userData.name}:</b>{" "}
                            {conversationHistory[i]}
                        </p>
                    );
                } else if (i == 3 * n + 2) { // bot message
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
