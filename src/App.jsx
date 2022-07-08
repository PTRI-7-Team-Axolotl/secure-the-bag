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
        <p>Secure the Bag</p>
        <nav>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/signup">Sign Up</Link> | {" "}
          <Link to="/user">User</Link> | {" "}
        </nav>
        <Outlet />
      </div>
    </DndProvider>
  );
}

export default App;
