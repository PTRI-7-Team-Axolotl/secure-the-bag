import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Login from './Login.jsx';
import { useForm } from 'react-hook-form';

function Signup() {

  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = data => {
    console.log(data);
    //do stuff with backend
  }
  console.log(errors);
  
  return (
    <div className='signup'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Email" {...register("Email", {required: true, pattern: /^\S+@\S+$/i})} />
        <input type="password" placeholder="Password" {...register("Password", {required: true})} />

        <input type="submit" />
      </form>
      <p>Already a user?</p>
      <Link to='/login' element={Login}>Login</Link>
  </div>
    
  );
}
//   const [email, setEmail] = useState(null);
//   const [password, setPassword] = useState(null);

//   function onClick() {
//     const emailInput = document.querySelector('#email').value;
//     const passwordInput = document.querySelector('#password').value
    
//     setEmail(emailInput);
//     setPassword(passwordInput);
//   }

//   useEffect(() => {
//     console.log('Email: -->', email)
//     console.log('Password: -->', password)
//   })


//   return (
//     <div className="signup" style={styles.container}>
//       <h1 style={styles.h1}>Signup</h1>
//       <form action="" style={styles.form}>
//         <label for="email" style={styles.labels}>Email:</label>
//         <input type="text" id="email" name="email" style={styles.inputs}/>
//         <label for="password" style={styles.labels}>Password:</label>
//         <input type="text" id="password" name="password" style={styles.inputs}/>
//         <button onClick={onClick}>Signup</button>
//       </form>
//       <p>Already a user?</p>
//       <Link to='/login' element={Login}>Login</Link>
//     </div>
//   );
// }

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
  labels: {
    padding: '0.5em',
    margin: '0.25em auto',
    width: '15%',
  },
  inputs: {
    padding: '.24em',
    margin: '1em auto',
    width: '15%'
  },
  h1: {
    margin: '1em auto',
    textAlign: 'center'
  },
  button: {
    width: 'auto'
  }
}

export default Signup;