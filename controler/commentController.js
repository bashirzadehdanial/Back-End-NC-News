const {eraseCommentById} = require("../model/commentModel")
const endpointsJSON = require("../endpoints.json");




function deleteCommentById(request, response, next){
    const id = request.params.comment_id;
    eraseCommentById(id)
      .then(() => {
        response.status(204).send({});
      })
      .catch((err) => {
        next(err);
      });
  };


module.exports= {deleteCommentById}