const fs = require("fs");

const users = []

users.push({
    "usertag": "GARD010803MDFRVNA7",
    "birthday": "03-08-2001:4500",
    "parent_usertag": ""
})

const allegue = {
    "usertag": "ALLEGUE230308CVAXD",
    "birthday": "03-08-2001:4500",
    "parent_usertag": "GARD010803MDFRVNA7"
}

users.push(allegue);

// console.log(JSON.stringify(users));
fs.writeFileSync("json-jsondata.json", JSON.stringify(users));
