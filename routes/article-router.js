const articleRouter = require('express').Router();
const {getArticles, getCommentsByArticleID, patchArticleVoteById, postCommentByArticleId, getArticlesWithQuery} = require('../controler/articleController')

articleRouter
  .route('/')
  .get(getArticlesWithQuery)

articleRouter
  .route('/:article_id')
  .get(getArticles)
  .patch(patchArticleVoteById)

  articleRouter
  .route('/:article_id/comments')
  .get( getCommentsByArticleID )
  .post(postCommentByArticleId)


  module.exports = articleRouter;