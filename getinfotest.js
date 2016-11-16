var dalNoSQL = require('./DAL/no-sql.js');


var ringMyPhone = function(err, personWeGot) {
    if (err) {
        return err.message
    }

    return personWeGot
}

var effort = "relief_St_Phillips_Haiti_2015"

console.log(dalNoSQL.getReliefEffort(effort, ringMyPhone));
