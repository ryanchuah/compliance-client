import React, { useState, useEffect } from "react";

function Dashboard(props) {
    return <div>{<p>Welcome {props.user.userData.name}</p>}</div>;
}

export default Dashboard;
