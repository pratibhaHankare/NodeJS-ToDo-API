//mongoclient ->allows you to create a connection to server
var {MongoClient,ObjectID}=require('mongodb');

//.connect ->method takes 2 arug=>1.url of connection may be amazon web services url or heroku url or localhost url 2.callabck function:- this function is thrown out when connection is either fail
MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,client)=>{
  if(err){
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
//refering it to the db tht we want get connectded to
const db=client.db('TodoApp');
/*3 ways i can delete the data
1.deleteMany->targets many documents(rows)
  Goal:find the all the rows based on critieria may be a duliplicay and delete those namy rows

  db.collection('Todos').deleteMany({text:'something to do'}).then((result)=>{
    console.log(result);
  });

*/
/*
2.deleteOne->targets one document(row) & returns the same document so that user knows exactly which one deleted.
  Goal :- is to delete only one record regardless there many rows found statisfying the same condition.

  db.collection('Todos').deleteOne({text:'have a breakfast'}).then((result)=>{
    console.log(result);
  });

*/
/*
3.findOneAndDelete->targets one document(row) & returns the same document so that user knows exactly which one deleted.
  Goal: is to delete only one record bt also returning the same record is returning abck so that user knws exactly which record is deleted

  db.collection('Todos').findOneAndDelete({completed:false}).then(
    (result)=>{console.log(result);}
  );
*/
/****************************************************************************/
/*challenge :1
db.collection('Users').deleteMany({name:'abc'}).then(
  (result)=>{
    console.log(result);
  }
);
*/
/*challenge :2
db.collection('Users').findOneAndDelete({name:'xyz'}).then(
  (result)=>{
    console.log(result);
  }
);
*/
/*challenge :3*/
db.collection('Users').findOneAndDelete({
  _id: new ObjectID('5a8bb85fc09b4a060c4df6c9')
}).then(
  (result)=>{
    console.log(result);
  }
);





//client.close();
});
