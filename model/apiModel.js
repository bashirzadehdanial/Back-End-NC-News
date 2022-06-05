const db= require('../db/connection.js');


function fetchApi(){
  return fs
    .readFile(
      "/Users/thebebop/northcoders/backend/be-nc-news/endpoints.json",
      "utf8"
    )
    .then((file) => {
      return file;
    });
};


module.exports= {  fetchApi}
