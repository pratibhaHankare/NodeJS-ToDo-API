const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {Users}=require('./../server/models/user');
///var id = '5a8d620fb6cf4852cc4be0144';
/*Query to search document by _id*/
/*Todo.find({
  //_id:id
}).then((todos)=>{
    console.log('Todos',todos);
});
/*Query to search the doc by using .findOne*/
/*Todo.findOne({
  _id: id
}).then(
  (todo)=>{
    console.log('Todo',todo);
  }
);
/*Query by using .findById()*/
/*Todo.findById(id).then(
  (todo)=>{
    if(!todo){
      return console.log('Id not found');
    }
    console.log('Todo By Id:',todo);
  }
).catch(
  (e)=>console.log(e)
);*/

/*Challenge*/
var usrId = '5a8cff4f320a652a8e35fdcd';
Users.findById(usrId).then(
  (usr)=>{
    if(!usr){
      return console.log('user was  not found');
    }
    console.log('user details are',usr)
  },(e)=>{
    console.log(e);
  });
