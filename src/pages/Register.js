import React, { useState } from "react";
import axios from "axios";

function Register(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [redirectTo, setRedirectTo] = useState("");

    const handleSubmit = async e => {
        e.preventDefault();

        try {
            console.log("posting now");

            const response = await axios.post("/users/register", {
                username,
                password
            });

            console.log(response);
            if (response.data) {
                console.log("successful signup");
                setRedirectTo("/register");
            } else {
                console.log("sign up error");
            }
        } catch (err) {
            console.log("sign up server error");

            console.log(err);
        }
    };

    return (
        <div>
            <p>Register Page</p>
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
                    <input type="submit" value="Register" />
                </div>
            </form>
        </div>
    );
}

export default Register;
