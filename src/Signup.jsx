import React from "react";
import Login from './Login.jsx';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useAuth } from './Auth.jsx';
import { Link, useNavigate, useLocation } from 'react-router-dom';


function Signup() {
  let navigate = useNavigate();
  // let location = useLocation();
  let auth = useAuth();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async formData => {
   
    console.log('Signup form data passed to back-end --> ', formData);

    await axios.post('/auth/signup', {
      email: formData.email,
      password: formData.password
    })
      .then(response => {
        console.log('Successful Signup request... UserId --> ', response)
        // let userId = response.data;
        // navigate to User page after successful signup
        auth.signin(formData.email, () => {
          navigate('/user', { replace: true });
        })
      })
      .catch(err => console.log('Error in Signup --> ', err))
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
      <Link to='/login' element={Login} style={{textAlign: 'center', margin: '0 auto'}}>Login</Link>
  </div>
    
  );
}

const styles = {
  container: {
    boxSizing: 'border-box',
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