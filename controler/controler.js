
const { fetchTopics, fetchArticle, updatePatchArticle,fetchUsers, fetchGetArticle} = require("../model/model")
const { fetchCommentsByID,  addComment} = require("../model/commentModel")

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

function getUsers(request,response, next){
    fetchUsers().then((users)=>{
        response.status(200).send({users:users})
    })
    .catch((err)=>{
        next(err)
    })
}

function getCommentsByID(request,response,next){
    const {article_id}= request.params
    fetchCommentsByID(article_id).then((comments)=>{
       response.status(200).send({comments})
    })
    .catch((err) => {
        next(err);
    })
}

function accessArticles(request,responsee,next){
    fetchGetArticle().then(result=>{
        responsee.status(200).send({result})
    })
    .catch((err)=>{
        next(err)
    })
}


function postCommentByArticleId(req, res, next){
    const articleId = req.params.article_id;
    const commentBody = req.body;
    addComment(articleId, commentBody)
      .then((comment) => {
          console.log(comment,">>>>>>>")
        res.status(201).send(comment);
      })
      .catch((err) => {
        next(err);
      });
  };









module.exports= {getTopics, getArticles, patchArticleVoteById,getUsers,getCommentsByID, accessArticles,postCommentByArticleId}

