const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

<<<<<<< HEAD
// router.get('/getjobs', )
=======
router.get('/getjobs', userController.getJobs, (req, res) => {
    console.log("I landed in getJobs!")
    console.log(res.locals.jobResults)
    return res.status(200).json(res.locals.jobResults);
})
>>>>>>> dev

module.exports = router;