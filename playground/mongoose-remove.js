const {ObjectID}=require('mongodb');
const {mongoose}=require('./../server/db/mongoose');
const {Todo}=require('./../server/models/todo');
const {Users}=require('./../server/models/user');

//.remove
/*
Todo.remove({}).then(
  (result)=>{
    console.log(result);
  }
);
*/
//Todo.findOneAndRemove
//Todo.findByIdAndRemove
Todo.findByIdAndRemove('5a8fb1cc091db7498a2dcb15').then(
  (todo)=>{
    console.log(todo);
  }
);
