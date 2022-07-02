const db = require('../models/userModel');
const bcrypt = require('bcryptjs');
const authController = {};

authController.verifyUser = async (req, res, next) => {
  console.log('Verifying user credentials...');
  const {
    email,
    password
  } = req.body;
  if (email && password) {
    const query = 'SELECT _id, password FROM users WHERE email=$1';
    const params = [email];
    try {
      const results = await db.query(query, params);

      if (results.rowCount !== 0) {
        try {
          const match = await bcrypt.compare(password, results.rows[0].password);
          if (match) {
            console.log('User verified!!');
            res.locals.verified_id = results.rows[0]._id;
            next();
          } else {
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