const express= require('express');
const app= express();
const { getTopics, getArticles} = require('./controler/controler');
const { handlePsqlErrors } = require('./errorHandler');
const { handleCustomErrors } = require('./errorHandler');
const { handleServerErrors } = require('./errorHandler');




app.get('/api/topics',getTopics)


app.get('/api/articles/:article_id',getArticles)

app.all("/*",(req,res,next)=>{
    res.status(404).send({msg: "not found"})
})

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)




module.exports= app;