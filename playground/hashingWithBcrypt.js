const bcrypt=require('bcryptjs');

var password ='123abc';
//this how the password is encrypted
/*bcrypt.genSalt(10,(err,salt)=>{
  bcrypt.hash(password,salt,(err,hash)=>{
    console.log(hash);
  });
});*/
//comparing the password with hashing

var hashedPassword='$2a$10$tqXnGHHD/dRnCs1fCfFVVOOEBXxsNMXJuNBjULI35hOexTEvHyxBa';

bcrypt.compare(password,hashedPassword,(err,res)=>{
  console.log(res);
});
