exports.handlePSQLErrors=(err,req,res,next)=>{
    if(err.code==="22P02"){
        res.status(400).send({msg: "bad request"})
    }else{
        next(err)
    }
}


exports.handleCustomError=(err, req, res, next)=>{
    res.status(404).send({msg: "not found"})
}


exports.handleInternalServerError=(err, req, res, next)=>{
    res.status(500).send({msg: "internal server error"})
}


