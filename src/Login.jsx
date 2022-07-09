import React from "react";
import axios from 'axios';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Signup from './Signup.jsx';
import { useAuth } from './Auth.jsx';

function Login() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  let navigate = useNavigate();
  // let location = useLocation();
  let auth = useAuth();

  // let from = location.state?.from?.pathname || '/';

  const onSubmit = async formData => {
    // console.log('Login form data passed to back-end --> ', formData);

    await axios.post('/auth/login', {
      email: formData.email,
      password: formData.password
    })
      .then(response => {
        // response is the userId --> verifiedId
        console.log('Successful Login request... UserId --> ', response)
        // let userId = response.data;
        // navigate to User dashboard on successful signup using verifiedId to display correct info in User --> 
        // navigate('/user', { replace: true });
        auth.signin(formData.email, () => {
          navigate('/user', { replace: true });
        })
      })
      .catch(err => console.log('Login error --> ', err));
  }
  console.log(errors);
  
  return (
    <div className='login' style={styles.container}>
      <h1 style={styles.h1}>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)} style={styles.form}>
        <input type="text" placeholder="Email" {...register("email", {required: true, pattern: /^\S+@\S+$/i})} style={styles.inputs}/>
        <input type="password" placeholder="Password" {...register("password", {required: true})} style={styles.inputs}/>

        <input type="submit" value="Login"/>
      </form>
      <p style={styles.p}>New user?</p>
      <Link to='/signup' element={Signup} style={{textAlign: 'center', margin: '0 auto'}}>Sign up!</Link>
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
    justifyContent: 'center'
  },
  inputs: {
    border: '1px solid blue',
    padding: '.24em',
    margin: '1em'
  },
  h1: {
    margin: '1em auto',
    textAlign: 'center'
  }
};

export default Login;