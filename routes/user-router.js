const { getUsers, getUserByUsername } = require('../controler/userController')
const userRouter = require('express').Router();

userRouter
  .route('/')
  .get(getUsers)

userRouter
  .route("/:username")
  .get(getUserByUsername);

  module.exports = userRouter;