const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt=require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'abc123').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.statics.findByToken=function(token){
  var User=this;
  var decoded;
  try{
    decoded=jwt.verify(token,'abc123');
  }catch(e){
    //if the problem occurs
    // return new Promise((resolve,reject)=>{
    //   reject();
    // });

    return Promise.reject();
  }
  return User.findOne({
    '_id': decoded._id,
    'tokens.token':token,
    'tokens.access':'auth'
  });
}

//this model is to take email nd fnd if user exisis in the db
UserSchema.statics.findByCredentials=function(email,password){
  var User =this;
  //to find if any user contains this email id
  return User.findOne({email}).then((user)=>{
        if(!user){
          return Promise.reject();
        }
        return new Promise((resolve,reject)=>{
          //use bcrypt.compare password and username

          bcrypt.compare(password,user.password,(err,res)=>{
            if(res){
              resolve(user);
            }else{
              reject();
            }
          });///compare
          });
        });
};


//this is too hash the password before saving password to db
UserSchema.pre('save',function(next){
  var user=this;
  if(user.isModified('password')){
    bcrypt.genSalt(10,(err,salt)=>{
      bcrypt.hash(user.password,salt,(err,hash)=>{
        user.password=hash;
        next();
      });
    })
  }else{
    next();
  }
});


var User = mongoose.model('User', UserSchema);

module.exports = {User}
