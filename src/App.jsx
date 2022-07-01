import React from "react";
import JobInfo from "./JobInfo.jsx"
import User from './User.jsx'
import { Route,  Routes} from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>this is inside app.js</p>
        <div className="userPage">
                < Routes>
                <Route path="user" element={<User />}/>
                      <Route path="job-info" element={<JobInfo />}/>
                </Routes>
            </div>  
      </header>
    </div>
  );
}

export default App;
