const express= require('express');
const app= express();

const { getTopics, getArticles, patchArticleVoteById, getUsers, getCommentsByID} = require('./controler/controler');
const { handlePsqlErrors } = require('./errorHandler');
const { handleCustomErrors } = require('./errorHandler');
const { handleServerErrors } = require('./errorHandler');


app.use(express.json())



app.get('/api/topics',getTopics)

app.get('/api/articles/:article_id',getArticles)

app.patch('/api/articles/:article_id',patchArticleVoteById)

app.get('api/users',getUsers)

app.get('/api/articles/:article_id/comments',getCommentsByID )





app.all("/*",(req,res,next)=>{
    res.status(404).send({msg: "not found"})
})

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)





module.exports= app;