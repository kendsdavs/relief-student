var dalNoSQL = require('./DAL/no-sql.js');

var ringMyPhone = function(err, createdEffortInCouch) {
    if (err) {
        return err.message
    }

    return createdEffortInCouch
}



console.log(dalNoSQL.updatePerson({
    _id: "person_stevean@duke.edu",
    _rev: "4-a354eb498e5eec00418846f5eb15eaa6",
    firstName: "Steven"}, ringMyPhone)
  )
