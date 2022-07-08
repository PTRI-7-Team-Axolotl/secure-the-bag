import { urlencoded } from 'express';
import React from 'react';



function HomePage() {

    return (
    <><div className="home-page" style={styles.container} ></div><h1 style={styles.h1}>Secure That Bag</h1></>)


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
  


export default HomePage;