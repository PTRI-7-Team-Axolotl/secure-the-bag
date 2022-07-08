const axios = require("axios");

const apiController = {};

apiController.getJobs = async (req, res, next) => {
  const options = {
    method: "GET",
    url: "https://google-jobs-search.p.rapidapi.com/search",
    params: { query: "NodeJS developer in New York" },
    headers: {
      "X-RapidAPI-Key": "124aece476msh3bab136bebdb64ap17d907jsn1b7c3e10fe64",
      "X-RapidAPI-Host": "google-jobs-search.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
      res.locals.jobResults = response.data.data;

      return next();
    })
    .catch(function (error) {
      console.error(error);
      return next(error);
    });
};

module.exports = apiController;
