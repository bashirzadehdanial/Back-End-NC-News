const db= require('../db/connection.js');

function fetchUsers(){
    return db.query('SELECT * FROM users').then((result)=>{
        if(!result.rows.length) return Promise.reject({status: 404, msg: "not found"})
    
        return result.rows
    })
 }

 function selectUserByUsername(username, next){
    const sqlQuery = 'SELECT  * FROM users WHERE username = $1;';
    return db.query(sqlQuery, [username])
    .then(({ rows: user }) => {
      if (user.length) return user[0];
      return Promise.reject({status: 404, msg: "not found"})
    })
  };

module.exports = {fetchUsers, selectUserByUsername}
