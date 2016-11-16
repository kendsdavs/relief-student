const path = require('path');
const fetchConfig = require('zero-config');
const mysql = require('mysql');

var dal = {
    //     getDBInfo: getDBInfo,
    createPerson: createPerson,
    createReliefEffort: createReliefEffort,
    removePerson: removePerson,
    removeReliefEffort: removeReliefEffort,
    updateReliefEffort: updateReliefEffort,
    updatePerson: updatePerson,
    getPerson: getPerson,
    getReliefEffort: getReliefEffort,
    //     createView: createView,
    listPersons: listPersons
    //listReliefEfforts: listReliefEfforts
    //     searchByLastName: searchByLastName
};

//////////////////////////
//////HELPER FUNCTIONS////
//////////////////////////
function parseToJSON(data) {
    return JSON.parse(JSON.stringify(data))
}

var convertPersonToNoSQLFormat = function(person) {
    person.active = (person.active === 1 ? true : false)
    person._id = person.id
    person.type = 'person'
    delete person.id
    return person
}
// "_id": "relief_Hurricane_Helpers_Hurricane_Hugo_1989",
//   "_rev": "2-21bcd93ddc4b2ad6ad4fc7446fae827d",
//   "phase": "completed",
//   "name": "Hurricane Hugo Charleston 1989",
//   "organizationID": "Hurricane Helpers",
//   "desc": "Purricane Hugo was a powerful Cape Verde-type hurricane that caused widespread damage and loss of life in the Leeward Islands, Puerto Rico, and the Southeast United States in 1989",
//   "start": "1989-09-10",
//   "end": "1989-09-25",
//   "active": true,
//   "type": "relief"
var convertReliefEffortToNoSQL = function(relief) {
  relief.active = (relief.active === 1 ? true : false)
  relief._id = relief.ID
  relief.type = 'relief'
  delete relief.ID
  return relief
}

function getDocByID(tablename, id, formatter, callback) {
    if (typeof id == 'undefined' || id == null) {
        return callback(new Error('400Missing _id property from data'));
    } else {
        var connection = createConnection()

        connection.query('SELECT * FROM '
        + connection.escapeId(tablename) +
        ' WHERE ID = ?', [id], function(err, data) {

            if(err) return callback(err)
            if(data.length === 0) {
                return callback({
                    error: 'not_found',
                    reason: 'missing',
                    name: 'not_found',
                    status: 404,
                    message: 'missing'
                });
            }
            if(data)
            //return callback(null, JSON.stringify(data[0]), null, 2)
            return callback(null, JSON.stringify(formatter(data[0]), null, 2))
        })
        connection.end(function(err) {
            if (err)
                return err;
            })
    }
}

function createConnection() {
    return mysql.createConnection({host: "0.0.0.0", user: "root", password: "mypassword", database: "Relief_Tracker"});
}
//This function helps transition from the COUCHDB
function prepDataForDB(data) {
    if (data.hasOwnProperty('active') === true) {
        data.active = data.active === true
            ? 1
            : 0
    }
    if (data.hasOwnProperty('type') === true) {
        delete data.type
    }
    return data;
}

// function queryDBSimple(tablename, sortBy, searchColumn, searchCriteria, callback) {}
function queryDB(tablename, sortBy, searchCriteria, limit, callback) {
  if (typeof searchCriteria == "undefined" || searchCriteria === null){
      return callback(new Error('400Missing search parameter'));
  } else if (typeof limit == 'undefined' || limit === null || limit === 0) {
      return callback(new Error('400Missing limit parameter'))
  } else {

      var connection = createConnection()
      var whereclause = searchCriteria === '' ? '' : ' WHERE sortToken > ?'
      console.log(whereclause)
      connection.query('SELECT * FROM ' +
          connection.escapeId(tablename) +
          whereclause +
          ' ORDER BY sortToken ' +
          ' LIMIT ' + limit, [searchCriteria],
          function (err, data) {
              if(err) return callback(err);
              if(data.length === 0) {
                  return callback({
                      error: 'not_found',
                      reason: 'missing',
                      name: 'not_found',
                      status: 404,
                      message: 'missing'
                  });
              }
              if(data)
               return callback(null, data)
          })
          connection.end(function(err) {
              if (err)
                  return err;
              })

       }


}

function deleteDocByID(dataTable, id, callback) {
 console.log("deleteDocByID id is = ", id)
    if (typeof id == 'undefined' || id === null) {
        return callback(new Error('400Missing _id property from data'));
    } else {
        var connection = createConnection()

        connection.query('DELETE FROM ' + connection.escapeId(dataTable)
          + ' WHERE id = ?', [id], function(err, res) {
            if (err)
                return callback(err)
            if(res)
                return callback(null, {
                    ok: true,
                    id: id
                });

        })
        connection.end(function(err) {
            if (err)
                return err;
            })
        }
}

//////////////////////////
//////EXPORT FUNCTIONS////
//////////////////////////
function createReliefEffort(data, callback) {
  if (typeof data == 'undefined' || data === null) {
      return callback(new Error('400Missing data for create'));
  } else if (data.hasOwnProperty('_id') === true) {
      return callback(new Error('400Unnecessary id property within data.' +
          'createReliefEffort() will generate a unique id'));
  } else if (data.hasOwnProperty('name') !== true) {
    return callback(new Error('400Missing name property within data.'))
  } else if (data.hasOwnProperty('organizationID') !== true) {
    return callback(new Error('400Missing organizationID property within data.'))
  } else if (data.hasOwnProperty('desc') !== true) {
    return callback(new Error('400Missing description property within data.'))
  } else {

    var connection = createConnection();

    connection.query('INSERT INTO relief SET ? ', prepDataForDB(data), function(err, res) {
      if (err)
        return callback(err);
      if (typeof res !== 'undefined' && res.insertId !== 'undefined') {
          return callback(null, {
              ok: true,
              id: res.insertId //property of mysql that returns the newly created ID that was created by the DB
          });
      }
    })
    connection.end(function(err) {
        if (err)
            return err;
        }
    )
  }

}

function createPerson(data, callback) {

    //TO DO: Data Validation - Check the incoming data and ensure nothing is missing or not needed

    // {
    //   "_id": "person_WyattJ1111@gmail.com",
    //   "_rev": "1-f92dcdd6bda5bd2b9e2e713c6de989cf",
    //   "firstName": "Wyatt",
    //   "lastName": "Johnston",
    //   "phone": "843 222-1212",
    //   "email": "WyattJ1111@gmail.com",
    //   "type": "person",
    //   "active": true
    // }

    //TO DO: Change the data before the query to the database is run.
    //- remove the type key in the json
    //TO DO: Create a connection to mysql
    //TO DO: query the database by performing a SQL INSERT INTO statement
    //TO DO: Change the JSON from mysql to the spec for our app.
    //TO DO: Call the callback tell the API that we're done.
    //  - GOODNESS OR BADNESS (err, result)
    //TO DO: Terminate the connection.
    if (typeof data == 'undefined' || data === null) {
        return callback(new Error('400Missing data for create'));
    } else if (data.hasOwnProperty('_id') === true) {
        return callback(new Error('400Unnecessary id property within data.' +
            'createPerson() will generate a unique id'));
    } else if (data.hasOwnProperty('lastName') !== true) {
        return callback(new Error('400Missing lastName property within data'));
    } else if (data.hasOwnProperty('firstName') !== true) {
        return callback(new Error('400Missing firstName property within data'));
    } else if (data.hasOwnProperty('email') !== true) {
        return callback(new Error('400Missing email property within data'));
    } else {
        var connection = createConnection()

        connection.query('INSERT INTO person SET ? ', prepDataForDB(data), function(err, res) {
            if (err)
                return callback(err);
            if (typeof res !== 'undefined' && res.insertId !== 'undefined') {
                return callback(null, {
                    ok: true,
                    id: res.insertId //property of mysql that returns the newly created ID that was created by the DB
                });
            }
        });
        connection.end(function(err) {
            if (err)
                return err;
            }
        )
    }
}

function updateReliefEffort(data, callback){
  console.log("updateReliefEffort data ", data)
  if (typeof data == 'undefined' || data === null) {
    return callback(new Error('400Missing data for update'))
  } else if (data.hasOwnProperty('._id') !== true) {
    return callback(new Error('400Missing id property from data'))
  } else {

    var connection = createConnection();
    var ID = data._id;
    console.log("data being added to query maybe need JSON", ID)
    delete data._id;

    connection.query("UPDATE relief SET ? WHERE ID = " + ID, prepDataForDB(data), function (err, res) {
      if (err)
        return callback(err)
      if ((typeof res !== 'undefined' && res.insertId !== 'undefined')) {
          return callback(null, {
              ok: true,
              id: res.insertId
          });
    }
  })
    connection.end(function(err) {
        if (err)
            return err;
        }
    )
  }
}

function updatePerson(data, callback) {
    if (typeof data == 'undefined' || data === null) {
        return callback(new Error('400Missing data for update'))
    } else if (data.hasOwnProperty('._id') !== true) {
        return callback(new Error('400Missing id property from data'));
    } else {

        var connection = createConnection()
        var ID = data._id; //still have the id value
        delete data._id //getting rid of the field

        connection.query('UPDATE person SET ? WHERE ID = ' + ID, prepDataForDB(data), function(err, res) {
            if (err)
                return callback(err)
            if ((typeof res !== 'undefined' && res.insertId !== 'undefined')) {
                return callback(null, {
                    ok: true,
                    id: res.insertId
                });
            }

        });
        connection.end(function(err) {
            if (err)
                return err;
            }
        )
    }
}

function removePerson(data, callback) {
    deleteDocByID('person', JSON.parse(data)._id, callback)
}

// function removePerson(data, callback) {
//   console.log("here is dataId", JSON.parse(data)._id)
//     deleteDocByID('person', JSON.parse(data)._id, callback)
//
// }
function removeReliefEffort(data, callback) {
  deleteDocByID('relief', JSON.parse(data)._id, callback)
}

function getPerson(id, callback) {
  console.log("tyring to get a person", id)
    getDocByID('person', id, convertPersonToNoSQLFormat, callback)
}

function getReliefEffort(id, callback) {
  getDocByID('relief', id, convertReliefEffortToNoSQL, callback)
}
//SELECT * FROM vPerson
// WHERE sortToken > 'Jones10'
// ORDER BY sortToken
// LIMIT 5;
function listPersons(tableName, searchCriteria, limit, callback) {
    queryDB('vPerson', '', searchCriteria, limit, callback)
}

// function listReliefEfforts(tableName, searchCriteria, limit, callback) {
//     queryDB('relief', '',limit, callback)
// }
//create the view within the db
//make call to the view, building a WHERE clase to skip the rows
//using the searchCriteria parameter
// limit by the limit parameter
module.exports = dal;
