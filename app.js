const express= require('express');
const app= express();
const { getTopics, getArticles} = require('./controler/controler');


app.get('/api/topics',getTopics)

app.get('/api/articles/:article_id',getArticles)







module.exports= app;