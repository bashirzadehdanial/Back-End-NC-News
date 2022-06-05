
const { fetchTopics, fetchArticle, updatePatchArticle,fetchUsers, fetchArticles, eraseCommentById, fetchApi} = require("../model/model")
const { fetchCommentsByID,  addComment} = require("../model/commentModel")
const endpointsJSON = require("../endpoints.json");

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
      checkExists("articles", "topic", topic)
        .then(() => {
          fetchArticles(request.query).then((articles) => {
              console.log(request.query)
            response.status(200).send({ articles });
          });
        })
        .catch((err) => {
          next(err);
        });
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

function deleteCommentById(request, response, next){
    const id = request.params.comment_id;
    eraseCommentById(id)
      .then(() => {
        response.status(204).send({});
      })
      .catch((err) => {
        next(err);
      });
  };

 
function getApi(req, res, next){
    res.status(200).send({ endpointsJSON });
  };







module.exports= {getTopics, getArticles, patchArticleVoteById,getUsers,getCommentsByID, postCommentByArticleId, getArticlesWithQuery, deleteCommentById, getApi}

