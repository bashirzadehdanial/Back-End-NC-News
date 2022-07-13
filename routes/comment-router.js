const { deleteCommentById,patchCommentById  } = require('../controler/commentController')
const commentRouter = require('express').Router();

commentRouter
  .route('/:comment_id')
  .delete(deleteCommentById)

commentRouter
   .route('/:comment_id')
   .patch(patchCommentById)


  module.exports = commentRouter;