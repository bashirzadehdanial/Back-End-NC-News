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




module.exports= {fetchTopics, fetchArticle}
