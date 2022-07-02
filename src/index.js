import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './Login.jsx';
import Signup from './Signup.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <Routes>
        <Route path='/' element={<App />}>
          <Route path="*" 
                  element={
                    <main style={{ padding: "1rem" }}>
                      <p>Bag not secured 😞</p>
                    </main>
                  }
          />
        </Route>
        <Route path='login' element={<Login />} />
        <Route path='signup' element={<Signup />} />
      </Routes>
    </React.StrictMode>
  </BrowserRouter>
);

