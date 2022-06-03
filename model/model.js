const db= require('../db/connection.js');

function fetchTopics(){
   return db.query('SELECT * FROM topics').then(result=>{
        if(!result.rows.length) return Promise.reject({status: 404, msg: "not found"})
        return result.rows
 })
}


function fetchArticle(id){
    return db.query('SELECT * FROM articles WHERE article_id=$1',[id]).then(result=>{
        if(!result.rows.length) return Promise.reject({status: 404, msg: "not found"})
        const author= result.rows[0]
        return author
    })
}

function updatePatchArticle(votes,articleId){
     return db.query(
        `UPDATE articles SET votes = votes + $1 WHERE article_id = $2 RETURNING *`,
        [votes, articleId]
      )
      .then((article) => {
        if (article.rows.length === 0) {
          return Promise.reject({ status: 404, msg: "not found" });
        }
        return article.rows[0];
      });
  }; 

function fetchUsers(){
    return db.query('SELECT * FROM users').then((result)=>{
        if(!result.rows.length) return Promise.reject({status: 404, msg: "not found"})
        return result.rows
    })
 }

function fetchCommentById(article_id){
    return db.query('SELECT * FROM comment WHERE article_id=$1',[article_id]).then((result)=>{
        if(!result.rows.length) return Promise.reject({status: 404, msg: "not found"})
        return result.rows
    })
}




module.exports= {fetchTopics, fetchArticle, updatePatchArticle, fetchUsers,fetchCommentById}

