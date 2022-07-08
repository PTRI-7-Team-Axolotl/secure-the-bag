import React from "react";
import { Outlet, Link } from 'react-router-dom';
import User from './User.jsx';
import { Route,  Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <p>this is inside app.js</p>
        <nav>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/signup">Sign Up</Link> | {" "}
          <Link to="/user">User</Link> | {" "}
          <Link to="/job-swipe">Job Swipe</Link>
        </nav>
        <Outlet />
      </div>
    </DndProvider>
  );
}

export default App;
