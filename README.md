# Tutorial de Protocol Buffers con JavaScript y Node.js

### Protocol Buffers
Son una forma estructurada de serializar datos. A diferencia de JSON, poseen una estructura especifica que ahorra mucho tiempo al momento de enviar y leer datos de maquina a maquina.
[Documentacion de Protocol Buffers](https://protobuf.dev/).

### Ejemplo de escritura de datos usando JSON:

Para este ejemplo, creo dos usuarios con las mismas caracteristicas y las meto en un arreglo de usuarios que luego escribo en un archivo llamado 'json-jsondata.json'
```javascript
const fs = require("fs");

const users = []

users.push({
    "usertag": "DRAG010803MDFRVNA7",
    "birth": "03-08-2001:4500",
    "parent_usertag": ""
})

const allegue = {
    "usertag": "ALLEGUE230308CVAXD",
    "birth": "08-03-2023:1309",
    "parent_usertag": "DRAG010803MDFRVNA7"
}

users.push(allegue);

// console.log(JSON.stringify(users));
fs.writeFileSync("json-jsondata.json", JSON.stringify(users));
```
La estructura de los datos se define de forma basica en el nombre de los campos del objeto JSON. Podemos ponerle cualquier nombre a cualquier elemento.

Contenido de `json-jsondata.json`:
```
[{"usertag":"GARD010803MDFRVNA7","birthday":"03-08-2001:4500","parent_usertag":""},{"usertag":"ALLEGUE230308CVAXD","birthday":"03-08-2001:4500","parent_usertag":"GARD010803MDFRVNA7"}]
```
## Usando Protocol Buffers

### 1) Definimos la estructura de el dato que queremos guardar en un archivo `.proto`
Para este ejemplo, esta es la estructura de `users.proto`:
```
syntax = "proto3";

message User {
    string usertag = 1;
    string birth = 2;
    string parent_usertag = 3;
}

message Users {
    repeated User users = 1;
}
```

Se declara la version de protocol buffers y la estructura del objeto de acuerdo a las necesidades.

### 2) Instalamos la dependencia de protocol buffers
Traemos la dependencia con el comando `npm i protocol-buffers`
[Referencia de la dependencia](https://www.npmjs.com/package/protocol-buffers).

### 2) Serializando y deserializando datos
Archivo comentado `index.js`
```javascript
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
```

Video de apoyo antes de que existiera la dependencia de npm: https://www.youtube.com/watch?v=46O73On0gyI

