const {fetchUsers} = require("../model/userModel")
const endpointsJSON = require("../endpoints.json");


function getUsers(request,response, next){
    fetchUsers().then((users)=>{
        response.status(200).send({users:users})
    })
    .catch((err)=>{
        next(err)
    })
}


module.exports= { getUsers}