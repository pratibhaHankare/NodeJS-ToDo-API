/*include model*/
var mongoose=require('mongoose');

/*Model*/
var Users=mongoose.model('Users',{
  email:{
    type:String,
    minlength:1,
    required:true,
    trim:true
  }
});

module.exports={Users};
