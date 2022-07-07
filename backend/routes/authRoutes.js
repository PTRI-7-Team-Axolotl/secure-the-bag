const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();
const authController = require('../controllers/authController')

console.log('inside authRoutes.js')
// add encryption middleware before signup when created (Mike)
router.post('/signup', authController.encryptPassword, userController.signup, authController.createSession, (req, res) => res.status(200).json(res.locals.user_id));

router.post('/login', authController.verifyUser, authController.createSession, (req, res) => res.status(200).json(res.locals.user_id));

router.post('/verify-token', authController.verifySession, (req, res) => res.status(200).json(res.locals.user_id));

module.exports = router;