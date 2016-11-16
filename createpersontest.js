var dalNoSQL = require('./DAL/no-sql.js');

var person = {

    type: "person",
    firstName: "Karen",
    lastName: "Ananias",
    phone: "843 665-5544",
    email: "karen@duke.edu"
}

var ringMyPhone = function(err, createdPersonInCouch) {
    if (err) {
        return err.message
    }

    return createdPersonInCouch
}

console.log(dalNoSQL.createPerson(person, ringMyPhone));
