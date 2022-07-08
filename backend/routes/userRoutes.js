const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();
const authController = require("../controllers/authController")

// this gets a job that the user has saved
// :id parameter required
router.get("/getjob", authController.verifyUser, userController.getJob, (req, res) => {
  return res.status(200).json(res.locals.values);
});

// this will get all of the saved jobs
router.get("/getalljobs", authController.verifyUser, userController.getAllJobs, (req, res) => {
  console.log("attempting to get all jobs");
  return res.status(200).json(res.locals.values);
});

router.post("/savejob", authController.verifyUser, userController.saveJob, (req, res) => {
  console.log("inside userRoute");
  return res.status(200).json(res.locals.user);
});

module.exports = router;
