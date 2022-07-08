require('dotenv').config();
const db = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const saltFactor = parseInt(process.env.SALT_WORK_FACTOR);
const authController = {};

authController.encryptPassword = async (req, res, next) => {
  // console.log('request body --> ', req.body)
  const { password } = req.body;
  // console.log('inside encryptPassword')
  if (password) {
    console.log('Encrypting password...');
    try {
      const encryptedPW = await bcrypt.hash(password, saltFactor);
      res.locals.password = encryptedPW;
      next();
    } catch (err) {
      next({
        log: 'Error in authController.encryptPassword: password hashing error - ' + JSON.stringify(err),
        status: 500,
        message: 'Could not encrypt password'
      });
    }
  } else {
    // Error message if no password entered
    next({
      log: 'Error in authController.encryptPassword: No password specified',
      status: 400,
      message: 'No password specified'
    });
  }

}

authController.verifyUser = async (req, res, next) => {
  console.log('Verifying user credentials...');
  const { email, password } = req.body;
  console.log('Email --> ', email, '|| Password --> ', password)
  if (email && password) {
    const query = 'SELECT user_id, password FROM users WHERE email=$1';
    const params = [email];
    
    try {
      const results = await db.query(query, params);
      console.log('results inside of verifyUser --> ', results.rows)
      if (results.rowCount !== 0) {
        try {
          const match = await bcrypt.compare(password, results.rows[0].password);
          
          if (match) {
            console.log('User verified!!');
            res.locals.user_id = results.rows[0].user_id;
            next();
          } else {
            console.log('match inside of verifyUser --> ', match)
            next({
              log: 'Error in userController.verifyUser: Incorrect password',
              status: 400,
              message: 'Incorrect password...'
            });
          }
        } catch (err) {
          next({
            log: 'Error in userController.verifyUser: ' + JSON.stringify(err),
            status: 500,
            message: 'Decryption error: ' + JSON.stringify(err)
          });
        }
      } else {
        next({
          log: 'Error in userController.verifyUser: User not found',
          status: 404,
          message: 'User does not exist'
        });
      }
    } catch (err) {
      next({
        log: 'Error in userController.verifyUser: ' + JSON.stringify(err),
        status: 500,
        message: 'Database error: ' + JSON.stringify(err.detail)
      });
    }
  } else {
    next({
      log: 'Error in userController.verifyUser: No email / password',
      status: 400,
      message: 'Please enter a valid email / password'
    });
  }
};

authController.createSession = async (req, res, next) => {
  const user_id = res.locals.user_id;
  let token;
  try {
    token = await jwt.sign({ user_id }, secret);
    console.log('Token --> ', token);
  } catch (error) {
    next({
      log: 'Error in authController.createSession: unable to sign token',
      status: 500,
      message: 'Unable to sign token'
    })
  }
  try {
    const query = 'UPDATE users SET token=$1 WHERE user_id=$2';
    const params = [token, user_id];
    if (token && user_id) {
      await db.query(query, params);
      res.cookie('SID', token, {httpOnly: true});
    } else {
      next({
        log: 'Error in authController.createSession: no user/token',
        status: 400,
        message: 'No user/token'
      })
    }
  } catch (error) {
    next({
      log: 'Error in authController.createSession: could not write session to database',
      status: 500,
      message: 'Database Error'
    })
  }
  next();
};

authController.verifySession = async (req, res, next) => {
  const token = req.cookies.SID;
  let user_id;
  if (!token) next({
    log: 'Error in authController.verifySession: No token',
    status: 401,
    message: 'No token'
  });
  try {
    const result = await jwt.verify(token, process.env.JWT_SECRET);
    console.log('Verified Token Info --> ', result);
    user_id = result.user_id;
  } catch (error) {
    res.cookie('SID', 'invalid', {maxAge: 1});
    next({
      log: 'Error in authController.verifySession: token not valid',
      status: 403,
      message: 'Token invalid'
    })
  }
  const query = 'SELECT token FROM users WHERE user_id=$1';
  const params = [user_id];
  try {
    const data = await db.query(query, params);
    if (data.rows[0].token === token) {
      res.locals.user_id = user_id;
      next();
    } else {
      res.cookie('SID', 'invalid', {maxAge: 1});
      next({
        log: 'Error in authController.verifySession: token does not match token in database',
        status: 403,
        message: 'Session mismatch'
      });
    }
  } catch (error) {
    res.cookie('SID', 'invalid', {maxAge: 1});
    next({
      log: 'Error in authController.verifySession: token not in database',
      status: 403,
      message: 'Invalid session'
    })
  }

};

module.exports = authController;