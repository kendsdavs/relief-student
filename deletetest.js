var dalNoSQL = require('./DAL/no-sql.js');

var person = {
    _id: "person_stevean@duke.edu",
    _rev: "1-698d386a67c4d244d92f42343d5842aa",
    type: "person",
    firstName: "Steve",
    lastName: "Ananias",
    phone: "843 555-1515",
    email: "stevean@duke.edu"
}


console.log(dalNoSQL.removePerson(person))

//console.log(dalNoSQL.createReliefEffort(effort, ringMyPhone))
