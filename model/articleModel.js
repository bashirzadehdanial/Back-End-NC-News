const db=require("../db/connection")

function fetchArticle(id){
    return db.query('SELECT * FROM articles WHERE article_id=$1',[id]).then(result=>{
        if(!result.rows.length) return Promise.reject({status: 404, msg: "not found"})
        const author= result.rows[0]
        return author
    })
}


function addComment(articleId, comment){
  const { body, author } = comment;
  return db.query(`INSERT INTO comments (body, author, article_id)
    VALUES ($1, $2, $3) 
    RETURNING *;`,[body, author, articleId])
    .then((response) => {
      return response.rows[0];
    });
};

function fetchCommentsByArticleID(article_id){
            
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


function fetchArticles(query){
    const validSortBy = [
      "title",
      "topic",
      "author",
      "body",
      "created_at",
      "votes",
      "comment_count",
    ];
  
    const ValidOrder = ["asc", "desc"];
  
    const { sort_by = "created_at", order = "desc", topic, author } = query;
  
    //Query Strings
    let queryStr = `
    SELECT articles.*,
    COUNT(comment_id)::int AS comment_count
    FROM articles
    LEFT JOIN comments
    ON comments.article_id = articles.article_id `;
  
    let queryTopic = `
    WHERE topic = $1`;
  
    let queryAuthor = `
    WHERE articles.author = $1`;
  
    let queryStrTwo = `
    GROUP BY articles.article_id
    `;
  
    //SORT_BY VALIDITY CHECKER
    if (validSortBy.includes(sort_by)) {
      queryStrTwo += `ORDER BY ${sort_by}`;
    } else {
      return Promise.reject({ status: 400, msg: "Bad Request" });
    }
  
    //ORDER VALIDITY CHECKER
    if (ValidOrder.includes(order)) {
      if (order === "desc") {
        queryStrTwo += ` DESC`;
      } else {
        queryStrTwo += ` ASC`;
      }
    } else {
      return Promise.reject({ status: 400, msg: "Bad Request" });
    }
  
    // FINAL QUERY STR & VALUES
    let queryVal = [];
    let finalQueryStr = queryStr + queryStrTwo;
  
    //TOPIC QUERY
    if (topic !== undefined) {
      finalQueryStr = queryStr + queryTopic + queryStrTwo;
      queryVal.push(topic);
    }
    // AUTHOR QUERY
    if (author !== undefined) {
      finalQueryStr = queryStr + queryAuthor + queryStrTwo;
      queryVal.push(author);
    }
  
    return db.query(finalQueryStr, queryVal).then((response) => {
      return response.rows;
    });
  };



 module.exports= {fetchArticle, addComment, fetchCommentsByArticleID, updatePatchArticle, fetchArticles}