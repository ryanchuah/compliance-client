import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard(props) {
    const [user, setUser] = useState({});

    useEffect(() => setUser(props.user), [props.user])

    return <div>{<p>Welcome {user.username}</p>}</div>;
}

export default Dashboard;
