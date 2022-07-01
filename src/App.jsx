import React from "react";
import User from './User.jsx'
import { Route,  Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>this is inside app.js</p>
        <div className="userPage">
                {/* < Routes>
                <Route path="/user" element={<User />}/>
                </Routes> */}
                <User />
            </div>  
      </header>
    </div>
  );
}

export default App;
