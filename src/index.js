import React from 'react';
import ReactDOM from 'react-dom/client';
// import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import User from './User.jsx';
// import JobInfo from './JobInfo.jsx';
import { RequireAuth, AuthProvider } from './Auth.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthProvider>
       <Routes>
        <Route path='/' element={<App />} >
          <Route path='login' element={<Login />} />
          <Route path='signup' element={<Signup />} />
          <Route 
            path='user' 
            element={
            <RequireAuth>
              <User />
            </RequireAuth>
            } 
            //  <Route path=':userId' element={<JobInfo />} />
          />
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
      </AuthProvider>
    </React.StrictMode>
  </BrowserRouter>
);

