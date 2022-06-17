const {fetchArticle, fetchCommentsByArticleID, addComment, updatePatchArticle, fetchArticles,checkExists}= require("../model/articleModel")
const endpointsJSON = require("../endpoints.json");




function getArticles(request,response,next){
    const id=Number(request.params.article_id)
     fetchArticle(id).then((article)=>{
         response.status(200).send(article)
     })
     .catch((err)=>{
         next(err)
     })
}

function getCommentsByArticleID(request,response,next){
    const {article_id}= request.params
    fetchCommentsByArticleID(article_id).then((comments)=>{
       response.status(200).send({comments})
    })
    .catch((err) => {
        next(err);
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


function postCommentByArticleId(request, response, next){
    const articleId = request.params.article_id;
    const commentBody = request.body;
    addComment(articleId, commentBody)
      .then((comment) => {
        response.status(201).send(comment);
      })
      .catch((err) => {
        next(err);
      });
  };



function getArticlesWithQuery(request, response, next){
    const { author, topic } = request.query;

    if (author) {
      checkExists("users", "username", author)
        .then(() => {
          fetchArticles(request.query).then((articles) => {
            response.status(200).send({ articles });
          });
        })
        .catch((err) => {
          next(err);
        });
    } else if (topic) {
      // checkExists("articles", "topic", topic)
      //   .then(() => {
        try {
          fetchArticles(request.query).then((articles) => {
            console.log(request.query)
          response.status(200).send({ articles });
        });
        } catch (error) {
          console.log(error);
        }
         
        // })
        // .catch((err) => {
        //   next(err);
        // });
    } else {
      fetchArticles(request.query)
        .then((articles) => {
          response.status(200).send( {articles} );
        })
        .catch((err) => {
          next(err);
        });
    }
};


module.exports= {getArticles, getCommentsByArticleID, patchArticleVoteById, postCommentByArticleId, getArticlesWithQuery}