//mongoclient ->allows you to create a connection to server
var {MongoClient,ObjectID}=require('mongodb');

//.connect ->method takes 2 arug=>1.url of connection may be amazon web services url or heroku url or localhost url 2.callabck function:- this function is thrown out when connection is either fail
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
//refering it to the db tht we want get connectded to
const db =client.db('TodoApp');
  /*fetching  of the  data present in the Todos table.
  .find is a method to do so
  toArray is going to present data in the form of object fetching from document*/
  /**db.collection('Todos').find().toArray().then((docs)=>{
   console.log('Todos');
   console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
  console.log('Unable to fetch todos',err);
});**/

/**fetch the data from the collection of which task are either completed or not completed.**/
/*db.collection('Todos').find({
  /*this is not going to work coz id is the obj & not string so we have take int conditor objectId above and fing from that object the id whoes info is required
  _id:'5a8aa79a2e4f61156a57c177'*/
/*  _id:new ObjectID('5a8aa79a2e4f61156a57c177')
}).toArray().then((docs)=>{
  console.log('ToDos');
  console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
    console.log('Unable to fetch todos',err);
});*/

db.collection('Users').find({name:'pratibha hankare'}).toArray().then((docs)=>{
  console.log(JSON.stringify(docs,undefined,2));
},(err)=>{
    console.log('Unable to fetch todos',err);
});



//client.close();
});
