var fs = require("fs");
var protobuf = require('protocol-buffers')

// Pass a proto file as a buffer/string or pass a parsed protobuf-schema object
var messages = protobuf(fs.readFileSync('users.proto'))

// Encode data as an User object
var buf = messages.User.encode({
  usertag: "DRAG010803MDFRVNA7",
  birth: "03-08-2001:4500",
  parent_usertag: ""
});

console.log('Serialized object', buf); // should print a buffer

fs.writeFileSync("usersbinary", buf); // should write an encoded binary file

// Decode data as an User object 
var obj = messages.User.decode(buf); 

console.log('Deserialized object: ', obj); // should print an object

var encobjfile = fs.readFileSync("usersbinary")
console.log('File from object: ', encobjfile); // should print an object
var objfile = messages.User.decode(encobjfile);
console.log('Deserialized file object: ', objfile); // should print an object