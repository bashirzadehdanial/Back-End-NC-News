const {eraseCommentById, updateCommentById} = require("../model/commentModel")
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


  function patchCommentById(request, response, next){
    updateCommentById(request.params.comment_id, request.body)
      .then((updatedComment) => {
        const timeOffset = updatedComment.created_at.getTimezoneOffset() * 60000;
        updatedComment.created_at = updatedComment.created_at.getTime() - timeOffset;
        response.status(201).send(updatedComment);
      })
      .catch((error) => {
        next(error);
      });
  };


module.exports= {deleteCommentById, patchCommentById}