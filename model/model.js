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


function fetchCommentsByID(article_id){
            
    const bodyArtic = db.query(`SELECT article_id FROM articles WHERE article_id = $1;`, [article_id])
        

    const bodyComm = db.query(`SELECT * FROM comments WHERE article_id = $1`, [article_id])
        
    return Promise.all([bodyArtic, bodyComm])
            .then(([bodyArtic, bodyComm]) => {
                if(!bodyArtic.rows.length) {
                return Promise.reject
                ({ status: 404, msg: `No review found for review_id: ${review_id}`});
                } 
                return bodyComm.rows;
            });
};

function fetchGetArticle(){
  return db.query(`
      SELECT 
      articles.article_id,    
      articles.author, 
      articles.title, 
      articles.topic, 
      articles.body, 
      articles.created_at, 
      articles.votes, 
  COUNT(comments.article_id)::INT AS comment_count 
  FROM articles
  LEFT JOIN comments ON comments.article_id = articles.article_id 
  GROUP BY articles.article_id
  ORDER BY created_at DESC;`).then((result) => {
    return result.rows;
});
}








module.exports= {fetchTopics, fetchArticle, updatePatchArticle, fetchUsers,fetchCommentsByID, fetchGetArticle}

