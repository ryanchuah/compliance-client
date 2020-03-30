import React, { useState, useEffect } from "react";

function Dashboard(props) {
    const [user, setUser] = useState({});

    useEffect(() => setUser(props.user), [props.user])

    return <div>{<p>Welcome {props.user.userData.name}</p>}</div>;
}

export default Dashboard;
