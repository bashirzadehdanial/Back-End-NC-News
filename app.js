const express= require('express');
const app= express();
const cors = require('cors');
const apiRouter = require('./routes/api-router')
const {getApi}= require('./controler/apiController')

const { handlePsqlErrors } = require('./errorHandler');
const { handleCustomErrors } = require('./errorHandler');
const { handleServerErrors } = require('./errorHandler');

app.use(cors());
app.use(express.json())
app.use('/api', apiRouter);

app.get("/api", getApi)

app.all("/*",(req,res,next)=>{
    res.status(404).send({msg: "not found"})
})

app.use(handleCustomErrors)

app.use(handlePsqlErrors)

app.use(handleServerErrors)



module.exports= app;

