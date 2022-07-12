const db= require('../db/connection.js');

function fetchUsers(){
    return db.query('SELECT * FROM users').then((result)=>{
        if(!result.rows.length) return Promise.reject({status: 404, msg: "not found"})
    
        return result.rows
    })
 }

module.exports = {fetchUsers}
