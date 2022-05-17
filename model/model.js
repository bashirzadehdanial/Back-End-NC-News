const db= require('../db/connection.js');
const { forEach } = require('../db/data/test-data/articles.js');


function fetchTopics(){
   return db.query('SELECT * FROM topics').then(result=>{
        if(!result.rows.length) return Promise.reject({status: 404, msg: "not found"})
        return result.rows
 })
}

function fetchArticle(id){
    return db.query('SELECT * FROM comments WHERE article_id=$1',[id]).then(result=>{
        if(!result.rows.length) return Promise.reject({status: 404, msg: "not found"})
        const author= result.rows
        author.forEach((item)=>{
            console.log(item)
            return db.query('SELECT * FROM articles WHERE author=$1 AND article_id=$2',[item.author,item.article_id]).then((result)=>{
                return result.rows[0]
            })
        })
     })
}




module.exports= {fetchTopics, fetchArticle}