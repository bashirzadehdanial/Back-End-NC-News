const {fetchTopics} = require("../model/topicModel")
const endpointsJSON = require("../endpoints.json");

function getTopics(request,response,next){
    fetchTopics().then((topics)=>{
        response.status(200).send({topics})
    })
    .catch((err)=>{
        next(err)
    })
}


module.exports= {getTopics}