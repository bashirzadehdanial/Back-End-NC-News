
const { fetchTopics, fetchArticle, updatePatchArticle} = require("../model/model")


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

function patchArticleVoteById(request,response,next){
    const { inc_votes: votes } = request.body;
    const { article_id: articleId } = request.params;
    updatePatchArticle(votes,articleId).then((article)=>{
        response.status(200).send({article: article})
    })
    .catch((err)=>{
        next(err)
    })
}




module.exports= {getTopics, getArticles, patchArticleVoteById}

