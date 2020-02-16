import React, { useState } from "react";

function Login() {
  // Declare a new state variable, which we'll call "count"

  return (
    <div>
      <p>Login Page</p>
      <form action="/login" method="post">
        <div>
          <label>Username:</label>
          <input type="text" name="username" />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" />
        </div>
        <div>
          <input type="submit" value="Log In" />
        </div>
      </form>
    </div>
  );
}

export default Login;
