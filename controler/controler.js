const { fetchTopics, fetchArticle} = require("../model/model")


function getTopics(request,response,next){
     fetchTopics().then((topics)=>{
        
         response.status(200).send({topics})
     })
     .catch((err)=>{
         next(err)
     })
}

function getArticles(request,response,next){
    const id=Number(request.params.article_id)
     fetchArticle(id).then((article)=>{
         response.status(200).send(article)
     })
     .catch((err)=>{
         next(err)
     })
}




module.exports= {getTopics, getArticles}
