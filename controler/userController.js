const {fetchUsers} = require("../model/userModel")



function getUsers(request,response){
    fetchUsers().then((users)=>{
        console.log(users);
        response.status(200).send({users:users})
    })
    // .catch((err)=>{
    //     next(err)
    // })
}


module.exports= { getUsers}

