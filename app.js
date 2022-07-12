const express= require('express');
const app= express();
const cors = require('cors');

const {getApi}= require('./controler/apiController')
const {getArticles, getCommentsByArticleID, patchArticleVoteById, postCommentByArticleId, getArticlesWithQuery}= require('./controler/articleController')
const {getTopics}= require('./controler/topicController')
const{deleteCommentById}= require('./controler/commentController')
const{getUsers}= require('./controler/userController')

const { handlePsqlErrors } = require('./errorHandler');
const { handleCustomErrors } = require('./errorHandler');
const { handleServerErrors } = require('./errorHandler');

app.use(cors());
app.use(express.json())


app.get("/api", getApi)
app.get('/api/users', getUsers)
app.get('/api/topics',getTopics)
app.get('/api/articles/:article_id',getArticles)
app.get('/api/articles/:article_id/comments', getCommentsByArticleID )
app.get("/api/articles", getArticlesWithQuery)



app.patch('/api/articles/:article_id',patchArticleVoteById)

app.post('/api/articles/:article_id/comments', postCommentByArticleId)

app.delete("/api/comments/:comment_id", deleteCommentById)





app.all("/*",(req,res,next)=>{
    res.status(404).send({msg: "not found"})
})

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)





module.exports= app;

