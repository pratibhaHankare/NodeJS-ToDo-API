//this page is do ne inorder seed the data from the in db so that this collection can be used to
// fetch from db and user it for verification.
//including db
const {ObjectID}=require ('mongodb');
//including the json web  token
const jwt=require('jsonwebtoken');
//include model todo thet contains all the sepcification of Todos
const {Todo}=require('./../../models/todo');
const {User}=require('./../../models/user');
/*adding the data that is required to fetch from in some test suites*/
const todos=[
  {
    _id:new ObjectID(),
    text:'First test todo'
  },{
    _id:new ObjectID(),
    text:'Second test todo',
    completed:true,
    completedAt:333
  }
];
/* adding the data that is required to fetch from in some user info*/
const userOneId=new ObjectID();
const userTwoId=new ObjectID();
const users=[{
  //complete info
  _id:userOneId,
  email:'pratibha@example.com',
  password:'userone',
  tokens:[{
    access:'auth',
    token:jwt.sign({
      _id:userOneId,
      access:'auth'
    },'abc123'.toString())
  }]
},{
  //Incomplete info
  _id:userTwoId,
  email:'user2@gmail.com',
  password:'usertwo'
}];


//this function is to clear all entried of db each time before entering to db new onces
const populateTodos=(done)=>{
  Todo.remove({}).then(
    ()=>{
    return Todo.insertMany(todos);
  }
).then(
  ()=>done()
);
}

//this function is to clear all enteried of db each time before entering to db new onces
const populateUser=(done)=>{
  User.remove({}).then( ()=>{
    var userOne=new User(users[0]).save();
    var userTwo=new User (users[1]).save();
    return Promise.all([userOne,userTwo]);
  }).then( ()=>done());
};


//expoerting the this both functions files where it is required
module.exports={ todos, populateTodos,users,populateUser};
