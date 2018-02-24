require('./config/config.js');
/*Lib Imports*/
const _=require('lodash');
const express=require('express');
const bodyParser=require('body-parser');
/*Local imports*/
/*importing the db*/
const {ObjectID}=require('mongodb');
//including the connection string in the files
var {mongoose} =require ('./db/mongoose');
/*including custome files*/
var {Todo}=require('./models/todo');
var {User}=require('./models/user');

//intialising var that is going to store app
var app = express();

//while deploying to the heroku i need to set it env & local host
const port= process.env.PORT || 3000;

//intialising middleware->using middleware from body-parser
app.use(bodyParser.json());
/*********************************************************/
//setting up route with post
app.post('/todos',(req,res)=>{
  //console.log(req.body);
  /*saving the input in the DB*/
  var todo= new Todo(
    {
      text:req.body.text
    });
  todo.save().then(
    (doc)=>{ res.send(doc);},
    (e)=>{ res.status(400).send(e);}
  );
});
/************************************************************/
//route to fetch todos if present in DB using GET
app.get('/todos',(req,res)=>{
  //fetching whole data from DB
  Todo.find().then(
    (todos)=>{ res.send({todos});
  },(e)=>{
    res.status(400).send(e);
  });
});
/************************************************************/
//this route is to get id from url and by taking that id from url & fetch ing data from the DB
app.get('/todos/:id',(req,res)=>{
  /*storing the url parameter into a varible*/
 var id =req.params.id;
   //res.send(req.param.id);
  /*validating id using isValid if not valid than sending 404 error*/
  if(!ObjectID.isValid(id))
  {
    //return console.log('ID is not valid');
      return res.status(404).send();
  }
  //console.log('Id is valid');
  /*finding the result from id*/
  /*
  .then ->predicts only success
  .catch -> runs during when error occurs
  */
  Todo.findById(id).then(
    (todo)=>{
      if(!todo){
      //  return console.log('user was not found');
       return res.status(404).send();
      }
      //console.log('Todo found are',todo)
    res.send({todo});
    }).catch(
    //console.log(e);
    (e)=>{  res.status(400).send();
    })
});
/****************************************************************************/
//setting up the route for delete
app.delete('/todos/:id', (req, res) => {
  var id = req.params.id;

  if (!ObjectID.isValid(id)) {
    return res.status(404).send();
  }

  Todo.findByIdAndRemove(id).then((todo) => {
    if (!todo) {
      return res.status(404).send();
    }

    res.send({todo});
  }).catch((e) => {
    res.status(400).send();
  });
});
/************************************************************/
app.patch('/todos/:id',(req,res)=>{
  //taking the id url and storing in the id using params
  var id=req.params.id;
  var body=_.pick(req.body,['text','completed']);
  /*validating if id is valid or not */
  if(!ObjectID.isValid(id)){
    return res.status(404).send();
  }
/*checking if completed(type) == 1 and its value is TRUE if yes than allot the date to completedAt value */
  if(_.isBoolean(body.completed) && body.completed)
  {
//setting up of value for completedAt
    body.completedAt=new Date().getTime();
  }else{
    //else default values
    body.completed=false;
    body.completedAt=null;
  }
//update using findByAndUpdate then if todo is o/p check if its updated than returen the updated document
//set -->updates and new ->default is false ->meaning give docu before the update
//of updating failsa than catch
  Todo.findByIdAndUpdate(id,{$set:body},{new:true}).then((todo)=>{
    if(!todo){
      return res.status(404).send();
    }
    res.send({todo});
  }).catch((e)=>{
    res.status(400).send();
  })
});
/************************************************************/
//inorder to run the app on Local it has listen by server at some port
app.listen(port,()=>{
  console.log(`Started on port ${port}`);
});


/*exporting the app varible*/
module.exports={app};
