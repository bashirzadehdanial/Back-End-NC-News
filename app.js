const express= require('express');
const app= express();
const promise= require('fs/promises')
const { getTopics } = require('./controler/controler');
const { handlePSQLErrors, handleInternalServerError, handleCustomError } = require('./errors');


app.use(express.json())

app.get('/api/topics',getTopics)

app.use(handlePSQLErrors)

app.use(handleCustomError)

app.use(handleInternalServerError)




module.exports= app;