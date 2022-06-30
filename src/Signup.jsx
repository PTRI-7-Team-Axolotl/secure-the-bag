import React from "react";

function Signup() {
  return (
    <div className="signup">
      <form action="">
        <label for="email">Email:</label>
        <input type="text" id="email" name="email" />
        <label for="password">Password:</label>
        <input type="text" id="password" name="password" />
        <input type="button" value="Login" />
      </form>
      <p>New user?</p>
      <a>Signup here!</a>
    </div>
  );
}

export default Login;