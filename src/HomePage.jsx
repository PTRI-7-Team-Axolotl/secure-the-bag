import React from 'react';
import { Link } from 'react-router-dom';



function HomePage() {

  return (
    <div className="home-page" style={styles.container}>
      {/* <h1 style={styles.h1}>Secure The Bag</h1> */}
      <div>
      <section className="showcase">
        <img src= "https://source.unsplash.com/8lnbXtxFGZw" />
        <h1 className="title">SECURE THE BAG</h1>
        </section>
        </div>
      <div>
      <Link to="login" style={styles.form}> <button className="button"> Login </button></Link>
      <br></br>
      {/* <br></br>
      <p style={styles.p} >New user?</p> */}
      <Link to='signup' style={styles.form}><button className="button"> Sign up! </button> </Link>
      </div>
      
      </div>
  )
}

const styles = {  
  container: {
    // boxSizing: 'border-box',
    border: '5px blue',
    borderRadius: '24px',
    padding: '1em',
    margin: '1em auto',
    background: 'black',
    width: '50%',
    color: 'dark blue',
    font: 'cascade script'
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
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