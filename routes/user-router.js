const { getUsers } = require('../controler/userController')
const userRouter = require('express').Router();

userRouter
  .route('/')
  .get(getUsers)


  module.exports = userRouter;