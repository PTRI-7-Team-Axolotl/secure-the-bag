const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();
const authController = require('../controllers/authController')

console.log('inside authRoutes.js')
router.post('/signup', authController.encryptPassword, userController.signup, authController.createSession, (req, res) => {
    console.log('im inside auth Router!!')
    return res.status(200).json(res.locals.user_id)
})

router.post('/login', authController.verifyUser, authController.createSession,  (req, res) => {
    return res.status(200).json(res.locals.verified_id)
})

module.exports = router;