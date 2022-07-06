const express = require('express');
const userController = require('../controllers/userController')
const router = express.Router();

router.get('/getjob', userController.getJobs, (req, res) => {
    
    return res.status(200).json(res.locals.jobResults);
})

router.post('/savejob', userController.saveJob, (req, res) => {

    return res.status(200).json(res.locals.user_id)
})

module.exports = router;