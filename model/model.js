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





module.exports= {fetchTopics, fetchArticle, updatePatchArticle, fetchUsers,  fetchArticles}

