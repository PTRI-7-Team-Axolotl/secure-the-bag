import React from "react";
import { Outlet, Link } from 'react-router-dom';
import User from './User.jsx';
import { Route,  Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RequireAuth, AuthProvider } from './Auth.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import HomePage from './HomePage.jsx'
import Layout from './Layout.jsx';

function App() {
  return (
//  <DndProvider backend={HTML5Backend}>
//     <AuthProvider>
//     <Routes>
//      <Route path='/' element={<Layout />}>
//         <Route index element={<HomePage/>}/>
//         <Route exact path='login' element={<Login />} />
//         <Route exact path='signup' element={<Signup />} />
//         <Route 
//           exact path='user' 
//           element={
//           <RequireAuth>
//             <User />
//           </RequireAuth>
//           } 
//         />
//         <Route
//           path="*"
//           element={
//             <main style={{ padding: "1rem" }}>
//               <p>Bag not secured.</p>
//             </main>
//           }
//           />
//      </Route>
//    </Routes>
//    </AuthProvider>
//    </DndProvider>
   
      <div className="App">
        <p>Secure the Bag</p>
        <nav>
          <Link to="/login">Login</Link> |{" "}
          <Link to="/signup">Sign Up</Link> | {" "}
          <Link to="/user">User</Link> | {" "}
          <Link to="/job-swipe">Job Swipe</Link>
        </nav>
        <Outlet />
      </div>
    
  );
}

export default App;
