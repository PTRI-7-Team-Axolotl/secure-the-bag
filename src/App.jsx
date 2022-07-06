import React from "react";
// import User from './User.jsx';
import { Link, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>this is inside app.js</p>
        <div className="userPage">
                {/* < Routes>
                <Route path="/user" element={<User />}/>
                </Routes> */}
                {/*<User />*/}
            </div>  
      </header>
      <Link to="/login">Login</Link> |{" "}
      <Link to="/signup">Sign Up</Link>
    </div>
  );
}

export default App;
