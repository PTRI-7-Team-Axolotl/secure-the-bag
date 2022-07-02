const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();
const authController = require('../controllers/authController')

console.log('inside authRoutes.js')
// add encryption middleware before signup when created (Mike)
router.post('/signup', userController.signup, (req, res) => {
    console.log('im inside auth Router!!')
    return res.status(200).json(res.locals.user_id)
})

router.post('/login', authController.verifyUser, (req, res) => {

    return res.status(200).json(res.locals.verified_id)
})

module.exports = router;