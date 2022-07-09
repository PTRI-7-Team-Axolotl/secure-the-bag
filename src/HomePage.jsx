
import React from 'react';
import { Link, useNavigate, Outlet} from 'react-router-dom';

import Signup from './Signup.jsx';



function HomePage() {

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