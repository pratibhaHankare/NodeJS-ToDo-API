const {SHA256}=require('crypto-js');
//a string to be  proected
var message='my name is pratibha';
//hashed password
var hash =SHA256(message).toString();

//output the result
console.log(`Message:${message}`);
console.log(`Hash:${hash}`);

//the obj to protected
var data={
  id:4
}

var token={
  data,
  hash:SHA256(JSON.stringify(data)+ 'thisismySecret').toString()
}

/*trying to hack*/
token.data.id=6;
token.hash=SHA256(JSON.stringify(data)).toString()

var resultHash=SHA256(JSON.stringify(token.data) +'thisismySecret').toString();
if(resultHash === token.hash){
  console.log('Data was not changed');
}else{
  console.log('Data was changed.Do not trust!!');
}
/*this enter process ogf passsing a token to protect the passwords is JSON WEB TOKEN (JWT) this can also be achived using the libray that you can see in actual project file*/
