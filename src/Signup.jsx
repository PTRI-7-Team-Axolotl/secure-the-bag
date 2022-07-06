import React from "react";
import { Link } from "react-router-dom";
import Login from './Login.jsx';
import { useForm } from 'react-hook-form';
import axios from 'axios';

// styles are temporary

function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async data => {
    console.log('Data before request --> ', data);

    await axios.post('/auth/signup', {
      email: data.email,
      password: data.password
    })
      .then(response => {
        console.log('Response from axios request --> ', response)
        // do stuff
      })
      .catch(err => {
        if (err.response) { 
          console.log('Error response --> ', err.response);
        } else if (err.request) { 
          console.log('Error request --> ', err.request); 
        } else { 
          console.log('Full error --> ', err); 
        }
      });
  }
  console.log(errors);
  
  return (
    <div className='signup' style={styles.container}>
      <h1 style={styles.h1}>Signup</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <input type="text" placeholder="Email" {...register("email", {required: 'Email is required.', pattern: /^\S+@\S+$/i})} style={styles.inputs}/>
        <input type="password" placeholder="Password" {...register("password", {required: 'Password is required.'})} style={styles.inputs}/>

        <input type="submit" value="Sign up"/>
      </form>
      <p style={styles.p}>Already a user?</p>
      <Link to='/login' element={Login} style={{textAlign: 'center', margin: '0 auto', border: '1px red solid'}}>Login</Link>
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
    flexDirection: 'column',
    justifyContent: 'center'
  },
  inputs: {
    padding: '.24em',
    margin: '1em auto'
  },
  h1: {
    margin: '1em auto',
    textAlign: 'center'
  },
  p: {
    textAlign: 'center'
  }
}

export default Signup;