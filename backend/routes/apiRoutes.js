
const express = require('express');
const apiController = require('../controllers/apiController')
const router = express.Router();

router.get('/getjobs', apiController.getJobs, (req, res) => {
    // console.log(res.locals.jobResults)
    return res.status(200).json(res.locals.jobResults);
})



module.exports = router;


