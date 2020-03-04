import React, { useState, useEffect } from "react";
import axios from "axios";

function History(props) {
    const [user, setUser] = useState({});
    const [conversationHistory, setConversationHistory] = useState([])

    useEffect(() => {
        setUser(props.user);
    }, [props.user.isLoggedIn]);

    useEffect(() => {
        console.log(conversationHistory);
        const fetchHistory = async () => {
            const history = await axios.get("/api/userData/history")
            setConversationHistory(history.data)
        }
        fetchHistory()
    }, [conversationHistory.length])

    return (
        <div>
            {conversationHistory}
        </div>
    );
}

export default History;
