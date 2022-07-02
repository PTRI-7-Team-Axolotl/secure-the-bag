import React from "react";
import { Outlet, Link } from "react-router-dom";
// import Login from "./Login.jsx";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Secure the Bag Homepage</h1>
      </header>
      <Link to='/login'>Login</Link> | {" "}
      <Link to='/signup'>Signup</Link>
      <Outlet />
    </div>
  );
}

export default App;
