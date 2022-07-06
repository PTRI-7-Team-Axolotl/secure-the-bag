const db = require('../models/userModel');
const bcrypt = require('bcryptjs');
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
  const {
    email,
    password
  } = req.body;
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
            res.locals.verified_id = results.rows[0].user_id;
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

module.exports = authController;