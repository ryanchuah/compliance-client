import React, { useState, useEffect } from "react";
import axios from "axios";

function Dashboard(props) {
    // const [user, setUser] = useState({});

    return <div>{<p>Welcome {props.user.username}</p>}</div>;
}

export default Dashboard;
