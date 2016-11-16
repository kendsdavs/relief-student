var dalNoSQL = require('./DAL/no-sql.js');

var effort = {

    phase: "completed",
    name: "Haiti 2015",
    organizationID: "St. Phillips",
    desc: "Build school desks and blackboards at the St. Esprit (Holy Spirit) church and school in the remote village of Gros Mangle in the island of La Gonave, Haiti. Home base is located in the main town of Anse - à - Galets at the St.François d’ Assise church and school.",
    start: "2015-09-25",
    end: "2015-10-01",
    team: [{
        name: "Steve Ananias",
        role: "Team Leader",
        personID: "person_stevean@duke.edu"
    }, {
        name: "Libby Satterfield",
        role: "Team member",
        personID: "person_lsat1972@gmail.com"
    }, {
        name: "Judy Jones",
        role: "Team member",
        personID: "person_judy5555@aol.com"
    }]
}

var ringMyPhone = function(err, createdEffortInCouch) {
    if (err) {
        return err.message
    }

    return createdEffortInCouch
}

console.log(dalNoSQL.createReliefEffort(effort, ringMyPhone));
