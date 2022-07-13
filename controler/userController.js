const {fetchUsers, selectUserByUsername} = require("../model/userModel")



function getUsers(request,response, next){
    fetchUsers().then((users)=>{
        response.status(200).send({users:users})
    })
    .catch((err)=>{
        next(err)
    })
}

function getUserByUsername (request, response, next){
    selectUserByUsername(request.params.username)
      .then((user) => {
        return response.status(200).send(user);
      })
      .catch((err) => {
        next(err);
      });
  };


module.exports= { getUsers, getUserByUsername}

