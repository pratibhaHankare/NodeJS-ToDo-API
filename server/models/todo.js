/*including the mongoose package*/
var mongoose=require('mongoose');

//creating a model .model helps in keeping the collections more organised
/*this basically defines the What collection shuld contain(col) along with col defination(like what kind of col shuld accept input as)*/
var Todo=mongoose.model('Todo',{
  text:{
    type:String,
    required:true,
    trim:true,
    minlength:1
  },
  completed:{
    type:Boolean,
    default:false
  },
  completedAt:{
    type:Number,
    default:null
  }
});

/*importing the model so that can used in other files*/
module.exports={Todo};
