//mongoclient ->allows you to create a connection to server
var MongoClient=require('mongodb').MongoClient;

/*****Grabbing the property value from object using es6 destructor function******/
var user={name:'andrew',age:25};
var {name}=user;
console.log(name);
/***********************************************/

//.connect ->method takes 2 arug=>1.url of connection may be amazon web services url or heroku url or localhost url 2.callabck function:- this function is thrown out when connection is either fail
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  //refering it to the db tht we want get connectded to
  const db =client.db('TodoApp');
  /*.collection ->table name
  insertone -> inserting data to row/document with properties
  */
/*  db.collection('Todos').insertOne({
    text:'something to do',
    completed:false
    //if something wents wrong callback function
  },(err,result)=>{
    if(err){
      return  console.log('Unable to insert todo',err);
    }
    //result.ops ->basically saves the the above data & undefined is for fliter function nd 2 is for intentation
    console.log(JSON.stringify(result.ops,undefined,2));
  });*/
  /*challenge*/
  db.collection('Users').insertOne({
    name:'pravin hankare',
    age:19,
    location:'sanquliem'
  },(err,result)=>{
    if(err){
      return console.log('Unable to connect to the server',err);
    }
    console.log(JSON.stringify(result.ops,undefined,2));
    /*to fetch single value
    console.log(result.ops[0]._id.getTimestamp);*/
 });

client.close();
});
