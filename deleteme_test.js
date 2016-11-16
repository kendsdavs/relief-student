var dal = require('./DAL/my-sql.js');

var relief = {
  phase: "completed",
  name: "Kenya 2016",
  organizationID: "St. Phillips",
  desc: "Build hospital in Kenya",
  start: "2016-01-05",
  end: "2016-02-15",
  active: true
}

function callback(message) {
  return function (err, result) {
    if(err) return console.log(err, "OH NO")
    return console.log(message, result)
  }
}

console.log(dal.createReliefEffort(relief, callback('You CREATED a relief')))

//console.log(dalMySQL);
