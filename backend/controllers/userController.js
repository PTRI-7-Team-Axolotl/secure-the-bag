const db = require("../models/userModel");
const axios = require("axios");
const userController = {};

userController.signup = async (req, res, next) => {
  const { email } = req.body;
  const params = [email, res.locals.password];
  // this query mush 1.) send a new user to the DB, 2.) bring back the _id and save it to res.locals._id
  const queryType = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id`;
  try {
    const values = await db.query(queryType, params);
    // are we sending anything back to the front end as a response or are we just storing the data?
    //add _id to res.locals
    res.locals.user_id = values.rows[0].user_id;
    console.log("im inside userController.signup!!!!!");
    return next();
  } catch (err) {
    console.log(err);
    next({
      log: "Error in userController.signup",
      status: 400,
      message: "userController.signup is causing an error",
    });
  }
};

userController.saveJob = async (req, res, next) => {
  const {
    employer_name,
    employer_logo,
    employer_website,
    job_publisher,
    job_employment_type,
    job_title,
    job_apply_link,
    job_description,
    job_is_remote,
    job_posted_at_datetime_utc,
    job_city,
    job_state,
    job_country,
    job_benefits,
    job_google_link,
    job_offer_expiration_timestamp,
    job_required_experience,
    job_required_skills,
    job_required_education,
    job_min_salary,
    job_max_salary,
  } = req.body;

  const user_id = 2;
  res.locals.user = user_id;

  const params = [
    employer_name,
    employer_logo,
    employer_website,
    job_publisher,
    job_employment_type,
    job_title,
    job_apply_link,
    job_description,
    job_is_remote,
    job_posted_at_datetime_utc,
    job_city,
    job_state,
    job_country,
    job_benefits,
    job_google_link,
    job_offer_expiration_timestamp,
    job_required_experience,
    job_required_skills,
    job_required_education,
    job_min_salary,
    job_max_salary,
    user_id,
  ];

  //where do we find user_id???

  // WITH job AS (INSERT INTO jobs (employer_name, logo, website, job_publisher, employment_type, job_title, application_link, description, is_remote, job_posted_at, city, state, country, benefits, job_google_link, job_expiration, required_experience, required_skills, education, min_salary, max_salary ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING jobs.job_id )
  // INSERT INTO users_jobs (user_id, job_id) SELECT $22, job_id FROM job RETURNING user_id

  const queryType =
    "WITH job AS (INSERT INTO jobs (employer_name, logo, website, job_publisher, employment_type, job_title, application_link, description, is_remote, job_posted_at, city, state, country, benefits, job_google_link, job_expiration, required_experience, required_skills, education, min_salary, max_salary ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21) RETURNING jobs.job_id )INSERT INTO users_jobs (user_id, job_id) SELECT $22, job_id FROM job RETURNING user_id";

  try {
    const values = await db.query(queryType, params);
    return next();
  } catch (err) {
    next({
      log: "Error in userController.saveJob:  " + JSON.stringify(err),
      status: 400,
      message: "userController.saveJob is causing an error",
    });
  }
};

userController.getAllJobs = async (req, res, next) => {
  try {
    // retrieve from cookie later
    const user_id = 1;

    // query for ALL of the job_id associated with the user (user_id)
    // get all the jobs that have that job_id

    const queryType =
      "SELECT users_jobs.user_id, jobs.* FROM users_jobs INNER JOIN jobs ON users_jobs.job_id = jobs.job_id WHERE users_jobs.user_id = $1";
    // returns an array full of objects that are the jobs
    const params = [user_id];

    const values = await db.query(queryType, params);

    res.locals.values = values.rows;
    return next();
  } catch (err) {
    next({
      log: "Error in userController.getAllJobs:  " + JSON.stringify(err),
      status: 400,
      message: "userController.getAllJobs is causing an error",
    });
  }
};

userController.getJob = async (req, res, next) => {
  try {
    // retrieve from cookie later
    const user_id = 1;
    const job_id = 2;
    // query for ALL of the job_id associated with the user (user_id)
    // get all the jobs that have that job_id

    const queryType =
      "SELECT users_jobs.user_id, jobs.* FROM users_jobs INNER JOIN jobs ON users_jobs.job_id = jobs.job_id WHERE users_jobs.user_id = $1 AND users_jobs.job_id = $2";
    // returns an array full of objects that are the jobs
    const params = [user_id, job_id];

    const values = await db.query(queryType, params);

    res.locals.values = values.rows;
    return next();
  } catch (err) {
    next({
      log: "Error in userController.getJob:  " + JSON.stringify(err),
      status: 400,
      message: "userController.getJob is causing an error",
    });
  }
};

module.exports = userController;
