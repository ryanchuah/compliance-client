import React, { useState, useEffect } from "react";

function Dashboard(props) {
    const [user, setUser] = useState({});

    useEffect(() => setUser(props.user), [props.user])

    return <div>{<p>Welcome {user.username}</p>}</div>;
}

export default Dashboard;
