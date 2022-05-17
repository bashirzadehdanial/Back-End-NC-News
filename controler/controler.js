const { fetchTopics, fetchArticle} = require("../model/model")


function getTopics(request,response,next){
     fetchTopics().then((topics)=>{
         response.status(200).send({topics})
     })
     .catch((err)=>{
         next(err)
     })
}

function getArticles(response,request,next){
    const id=Number(response.params.article_id)
     fetchArticle(id).then((article)=>{
         response.status(200).send(article)
     })
     .catch((err)=>{
         next(err)
     })
}




module.exports= {getTopics, getArticles}
