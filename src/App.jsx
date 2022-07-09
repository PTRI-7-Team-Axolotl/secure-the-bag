import React from "react";
import { Route, Routes, Outlet } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { RequireAuth, AuthProvider } from './Auth.jsx';
import Layout from './Layout.jsx';
import HomePage from './HomePage.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import User from './User.jsx';
import JobSwipe from "./JobSwipe.jsx";

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <AuthProvider>
        <Routes>
          <Route path='/' element={<Layout />}>
            <Route index element={<HomePage/>}/>
            <Route exact path='login' element={<Login />} />
            <Route exact path='signup' element={<Signup />} />
            <Route 
              exact path='user' 
              element={
              <RequireAuth>
                <User />
              </RequireAuth>
              } 
            />
            <Route exact path='job-swipe' element={<JobSwipe />} />
            <Route
              path="*"
              element={
                <main style={{ padding: "1rem" }}>
                  <p>Bag not secured.</p>
                </main>
              }
            />
          </Route>
        </Routes>
        <Outlet />
      </AuthProvider>
    </DndProvider>
  );
}

export default App;
