/*Lib Imports*/
var express=require('express');
var bodyParser=require('body-parser');

/*Local imports*/
//including the connection string in the files
var {mongoose} =require ('./db/mongoose');
/*including custome files*/
var {Todo}=require('./models/todo');
var {User}=require('./models/user');

//intialising var that is going to store app
var app = express();

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
//inorder to run the app on Local it has listen by server at some port
app.listen(3000,()=>{
  console.log('Started on Port 3000.');
});


/*exporting the app varible*/
module.exports={app};
