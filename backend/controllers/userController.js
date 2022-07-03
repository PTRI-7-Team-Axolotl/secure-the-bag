const db = require('../models/userModel');
const axios = require("axios");
const userController = {};

userController.signup = async (req, res, next) => {
    const { email} = req.body;
    const params = [email, res.locals.password]
    // this query mush 1.) send a new user to the DB, 2.) bring back the _id and save it to res.locals._id
    const queryType = `INSERT INTO users (email, password) VALUES ($1, $2) RETURNING user_id`
    try{
        const values = await db.query(queryType, params)
        // are we sending anything back to the front end as a response or are we just storing the data?
        //add _id to res.locals
        res.locals.user_id = values.rows[0].user_id
        console.log('im inside userController.signup!!!!!')
        return next()
    } catch(err) {
        console.log(err)
        next({
            log: 'Error in userController.signup',
            status: 400,
            message: 'userController.signup is causing an error'
          })
    }
}

// create a new controller saveJobs
userController.getJobs = async (req, res, next) => {
    const options = {
        method: 'GET',
        url: 'https://google-jobs-search.p.rapidapi.com/search',
        params: {query: 'NodeJS developer in New York'},
        headers: {
          'X-RapidAPI-Key': '124aece476msh3bab136bebdb64ap17d907jsn1b7c3e10fe64',
          'X-RapidAPI-Host': 'google-jobs-search.p.rapidapi.com'
        }
      };
      
      axios.request(options).then(function (response) {
        res.locals.jobResults = response.data.data
          
          return next();
      }).catch(function (error) {
          console.error(error);
          return next(error)
      });
      
}

module.exports = userController;