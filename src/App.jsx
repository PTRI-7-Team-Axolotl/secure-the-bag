import React from "react";
import User from './User.jsx'
import { Route,  Routes} from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
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
    </DndProvider>
  );
}

export default App;
