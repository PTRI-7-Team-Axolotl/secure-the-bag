import React from "react";
// import User from './User.jsx';
import { Outlet, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <p>this is inside app.js</p>
      <nav>
        <Link to="/login">Login</Link> |{" "}
        <Link to="/signup">Sign Up</Link> | {" "}
        <Link to="/user">User</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default App;
