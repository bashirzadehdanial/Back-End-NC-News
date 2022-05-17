const { fetchTopics } = require("../model/model")


function getTopics(request,response){
     fetchTopics().then((topics)=>{
         response.status(200).send({topics})
     })
     .catch((err)=>{
         next(err)
     })
}

module.exports= {getTopics}
