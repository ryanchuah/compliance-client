import React, { useState, useEffect } from "react";
import axios from "axios";

function History(props) {
    const [user, setUser] = useState({});
    const [userHistory, setUserHistory] = useState([])

    useEffect(() => {
        setUser(props.user);
    }, [props.user.isLoggedIn]);

    useEffect(() => {
        console.log(userHistory);
        const fetchHistory = async () => {
            const history = await axios.get("/api/userData/history")
            setUserHistory(history.data)
        }
        fetchHistory()
    }, [userHistory.length])

    return (
        <div>
            {userHistory}
        </div>
    );
}

export default History;
