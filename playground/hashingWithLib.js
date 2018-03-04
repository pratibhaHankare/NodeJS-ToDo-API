const jwt =require('jsonwebtoken');
var data={
  id:10
};
var token=jwt.sign(data,'123abc');
//consist of token.secrete.decode
console.log(token);
var decoded=jwt.verify(token,'123abc');

console.log(decoded);
