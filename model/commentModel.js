const db=require("../db/connection")



function eraseCommentById(id){
  return db.query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`, [id])
    .then((comment) => {
      if (!comment.rows.length) {
        return Promise.reject({ status: 404, msg: "Not Found" });
      }
    });
};

function selectUserByUsername(username, next){
  const sqlQuery = 'SELECT  * FROM users WHERE username = $1;';
  return db.query(sqlQuery, [username])
  .then(({ rows: user }) => {
    if (user.length) return user[0];
    return Promise.reject({ code: 'userNotFound'});
  })
  .catch((error) => {
    if (error.code === 'userNotFound') return Promise.reject({ code: 'userNotFound'});
    next(error);
  })
};

module.exports= {eraseCommentById, selectUserByUsername}