const express= require('express');
const app= express();
const { getTopics} = require('./controler/controler');


app.get('/api/topics',getTopics)







module.exports= app;