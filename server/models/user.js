/*include model*/
var mongoose=require('mongoose');
const validator=require('validator');
/*
{
email:'pratibha@example.com'
password:'dfcbhbgvfdhgbvfdhugbngvakmngk',
tokens:[{
  access:'auth'
  token:'asdcsvfgfhngmjhhdx'
}]
}
*/
/*Model*/
var Users=mongoose.model('Users',{
  email:{
    type:String,
    minlength:1,
    required:true,
    trim:true,
    unique:true,
    //custom validation
    validate:{
      validator:(value)=>{
        return validator.isEmail(value);
      },
      message:'{VALUE} is not a valid email'
    }
  },
  password:{
    type:String,
    require:true,
    minlength:6
  },
  tokens:[{
    access:{
      type:String,
      required:true,
    },
    token:{
      type:String,
      required:true
    }
  }]
});

module.exports={Users};
