const db= require('../db/connection.js');


function fetchTopics(){
   return db.query('SELECT * FROM topics').then(result=>{
        if(!result.rows.length) return Promise.reject({status: 404, msg: "not found"})
        return result.rows
 })
}




module.exports= {fetchTopics}