import React, { useState, useEffect } from "react";

function Index(props) {
    const [user, setUser] = useState({});

    useEffect(() => {
        setUser(props.user);
    }, [props.user.isLoggedIn]);

    // useEffect(() => {
    //     getUser();
    // }, [props.user.isLoggedIn]);

    return (
        <div>
            <p>Index</p>
            {user.isLoggedIn && <p>Welcome {user.username}</p>}
        </div>
    );
}

export default Index;
