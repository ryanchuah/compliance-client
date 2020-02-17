import React, { useState } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirectTo, setRedirectTo] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            console.log("posting now");

            const response = await axios.post("/user/login", {
                username,
                password
            });

            console.log(response);

            if (response.status === 200) {
                console.log("logged in");

                props.setUser({
                    isLoggedIn: true,
                    username: response.data.username
                });
                setRedirectTo("/dashboard");
            } else {
                console.log("not logged in");
                console.log(response.status);
            }
        } catch (err) {
            console.log("login server error");

            console.log(err);
        }
    };

    if (redirectTo) {
        return <Redirect to={{ pathname: redirectTo }} />;
    }

    return (
        <div>
            <p>Login Page</p>
            <form onSubmit={handleSubmit} method="post">
                <div>
                    <label>Email:</label>
                    <input
                        type="text"
                        name="email"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <input type="submit" value="Login" />
                </div>
            </form>
        </div>
    );
}

export default Login;
