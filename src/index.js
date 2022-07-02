import React from 'react';
import ReactDOM from 'react-dom/client';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';

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

