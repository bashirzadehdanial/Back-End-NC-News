const { getTopics } = require('../controler/topicController')
const userRouter = require('./api-router')
const apiRouter = require('express').Router();

apiRouter
  .route('/')
  .get(getTopics)


  module.exports = apiRouter;