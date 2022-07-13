const { deleteCommentById } = require('../controler/commentController')
const commentRouter = require('express').Router();

commentRouter
  .route('/:comment_id')
  .delete(deleteCommentById)


  module.exports = commentRouter;