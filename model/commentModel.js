const db=require("../db/connection")



function eraseCommentById(id){
  return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [id])
    .then((comment) => {
      if (!comment.rows.length) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
    });
};

function updateCommentById(commentId, { inc_votes }){
    if (isNaN(commentId)) {
      return Promise.reject({ status: 404, msg: "Not Found" });
    };
    const sqlQuery = 'UPDATE comments SET votes = votes + $1 WHERE comment_id = $2 RETURNING *';
    return db.query(sqlQuery, [inc_votes, commentId])
      .then(({ rows: commentRows }) => {
        if (commentRows.length) return commentRows[0];
        return Promise.reject({ status: 400, msg: "Bad Request" });
      })
  };




module.exports= {eraseCommentById, updateCommentById}