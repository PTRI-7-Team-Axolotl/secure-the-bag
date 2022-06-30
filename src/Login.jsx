import React from "react";

function Login() {
  return (
    <div className="login">
      <h2>Signup</h2>
      <form action="">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" />
        <label for="password">Password:</label>
        <input type="text" id="password" name="password" />
        <input type="button" value="Signup" />
      </form>
    </div>
  );
}

export default Login;