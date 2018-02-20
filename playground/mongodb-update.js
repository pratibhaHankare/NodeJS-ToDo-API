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

/*Updation using
1.findOneAndUpdate(fliter,update,options,callback);->will find the update record & will update it*/
/*db.collection('Todos').findOneAndUpdate(
  {//filter on basis of id
    _id:new ObjectID('5a8ab96bed04157118fd6f25')
  },
  {//update using $set operator
    $set:{
      completed:false
    }
  },
  {//options->the way data i want
    returnOriginal:false
  }
).then(
  (result)=>{
    console.log(result);
  }
);*/

db.collection('Users').findOneAndUpdate(
  {
    _id : new ObjectID("5a8bed2bc09b4a060c4dfb38")
  },
  {
    $set:{
      name:'Nitesh Sawant',
      location:'sanquliem'
    },
    $inc:{
      age:1
    }
  },
  {
    returnOriginal:false
  }
).then(
  (result)=>{
    console.log(result);
  }
);

//client.close();
});
