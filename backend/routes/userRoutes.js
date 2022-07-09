const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const authController = require("../controllers/authController");

// this gets a job that the user has saved
router.get("/job/:id",  authController.verifySession, userController.getJob, (req, res) => {
  return res.status(200).json(res.locals.values);
});

// this will get all of the saved jobs
router.get(
  "/getalljobs", authController.verifySession,
  userController.getAllJobs,
  (req, res) => {
    console.log("attempting to get all jobs", res.locals);
    return res.status(200).json(res.locals.values);
  }
);

// this will save a job when a user swipes right
router.post(
  "/savejob", authController.verifySession, 
  userController.saveJob,
  (req, res) => {
    console.log("inside userRoute");
    return res.status(200).json(res.locals.user);
  }
);
router.post('/updatestatus', authController.verifySession, userController.updateStatus, (req, res) => {
  console.log("updating status!");
    return res.status(200).json(res.locals.job)
})

module.exports = router;
