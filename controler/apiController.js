
const endpointsJSON = require("../endpoints.json");

function getApi(req, res, next){
    res.status(200).send({ endpointsJSON });
  };

  module.exports= {getApi}