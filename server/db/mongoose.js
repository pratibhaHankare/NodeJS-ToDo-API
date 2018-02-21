//loading monogoose
var mongoose= require('mongoose');
//inorder to use promise in our callback functions we need to configure
mongoose.Promise = global.Promise;
//the connection string to the db
mongoose.connect('mongodb://localhost:27017/TodoApp');

//we need to export mongoose so that other files can access it
module.exports={mongoose};
