
import React from 'react';
import { useEffect } from 'react';
import { Link, useNavigate, Outlet} from 'react-router-dom';
import Signup from './Signup.jsx';
import { useAuth } from "./Auth.jsx";
import axios from 'axios';



function HomePage() {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    function checkSession() {
      axios.get('/auth/landing')
      .then(response => {
        console.log(response);
        if (response.status === 200) {
          console.log('Already signed in');
          auth.signin(response.data, () => navigate('/user', { replace: true }));
        }
      })
      .catch(error => console.log(JSON.stringify(error)));
    }

    checkSession();

  });

  return (
    <div className="home-page" style={styles.container}>
      <h1 style={styles.h1}>Secure That Bag</h1>
      <Link to="login" style={styles.form}>Login</Link>
      <p style={styles.p} >New user?</p>
      <Link to='signup' style={styles.form}>Sign up!</Link>
    </div>
  )
}

const styles = {  
    container: {
      boxSizing: 'border-box',
      padding: '1em',
      margin: '0 auto'
    },
    form: {
      display: 'flex',
      justifyContent: 'center'
    },
    inputs: {
      border: '1px solid blue',
      padding: '.24em',
      margin: '1em'
    },
    h1: {
      margin: '1em auto',
      textAlign: 'center',
      font: "Bradley Hand, cursive"
    },
    p: {
      textAlign: 'center',
    }
  };
  


export default HomePage;