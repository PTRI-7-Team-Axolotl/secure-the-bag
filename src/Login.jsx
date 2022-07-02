import React from "react";
import { Link } from 'react-router-dom';
import Signup from './Signup.jsx';

function Login() {
  return (
    <div className="login" style={styles.container}>
      <h1 style={styles.h1}>Login</h1>
      <form action="" style={styles.form}>
        <label for="email" style={styles.labels}>Email:</label>
        <input type="text" id="email" name="email" style={styles.inputs}/>
        <label for="password" style={styles.labels}>Password:</label>
        <input type="text" id="password" name="password" style={styles.inputs} />
        <input type="button" value="Login" />
      </form>
      <p style={{textAlign: 'center'}}>New user?</p>
      <Link to='/signup' element={Signup} >Signup here!</Link>
    </div>
  );
}

const styles = {
  container: {
    boxSizing: 'border-box',
    border: '1px solid red',
    padding: '1em',
    margin: '0 auto'
  },
  form: {
    display: 'flex',
    justifyContent: 'center'
  },
  labels: {
    padding: '0.5em',
    margin: '0.25em'
  },
  inputs: {
    padding: '.24em',
    margin: '1em'
  },
  h1: {
    margin: '1em auto',
    textAlign: 'center'
  }
};

export default Login;