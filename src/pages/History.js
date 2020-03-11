import React, { useState, useEffect } from "react";
import axios from "axios";

function genHistoryTable(records) {
    var html = "<table border=1><tbody>";

    for(var i = records.length - 1; i >= 0; --i) {
        var record = records[i];

        html += "<tr><td colSpan=2><b>"
        html += record.split('|')[0];
        html += "</b></td></tr>";

        html += "<tr><td colSpan=2><pre>"
        html += record.split('|')[1];
        html += "</pre></td></tr>";
    }

    html += "</tbody></table>";

    document.getElementById("container").innerHTML = html;
}

function History(props) {
    const [user, setUser] = useState({});
    const [conversationHistory, setConversationHistory] = useState([])

    useEffect(() => {
        setUser(props.user);
    }, [props.user.isLoggedIn]);

    useEffect(() => {
        const fetchHistory = async () => {
            const history = await axios.get("/api/userData/history");
            setConversationHistory(history.data);

            var records = [];

            history.data.map(s =>
            {
                if(s.length > 2 && '*' === s[0] && '*' === s[1])
                {
                    s = s.substring(2);
                    s = s + "|";

                    records.push(s);
                }
                else if(records.length > 0)
                {
                    s = s + "\n";
                    records[records.length - 1] += s;
                }
            })

            genHistoryTable(records);
        }
        fetchHistory()
    }, [conversationHistory.length])

    return (
        <div id="container">
        </div>
    );
}

export default History;
