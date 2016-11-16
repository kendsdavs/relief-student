/*jshint esversion: 6 */
const path = require('path');
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const fetchConfig = require('zero-config');

var config = fetchConfig(path.join(__dirname, '..'), {dcValue: 'test'});
const urlFormat = require('url').format;
const db = new PouchDB(urlFormat(config.get("couch")));

function getDBInfo() {
    return "Success!";
}

var dal = {
    getDBInfo: getDBInfo,
    createPerson: createPerson,
    createReliefEffort: createReliefEffort,
    removePerson: deletePerson,
    removeReliefEffort: deleteReliefEffort,
    updateReliefEffort: updateReliefEffort,
    updatePerson: updatePerson,
    getPerson: getPerson,
    getReliefEffort: getReliefEffort,
    createView: createView,
    listPersons: listPersons,
    listReliefEfforts: listReliefEfforts,
    searchByLastName: searchByLastName
};

//-------Helper functions
//function queryHelp()
function queryDB(sortBy, startkey, limit, callback) {
    // limit = limit == undefined || limit == null ? 5 : limit
    if (typeof sortBy == 'undefined' || sortBy === null) {
        return callback(new Error('missing search parameter'), null)
    }

    limit = startkey !== ''
        ? limit + 1
        : limit

    if (limit == undefined || limit == null)
        limit = 5
        // else limit = limit

    db.query(sortBy, {
        include_docs: true,
        startkey: startkey,
        limit: limit
    }, function(err, res) {
        if (err)
            return callback(err)
        callback(null, res)
    })
}

function deleteDoc(data, callback) {
    if (data.hasOwnProperty('_id') !== true) {
        return callback(new Error('400Missing _id property from data'));
    }
    if (data.hasOwnProperty('_rev') !== true) {
        return callback(new Error('400Missing _rev property from data'));
    }

    db.remove(data._id, data._rev, function(err, response) {
        if (err) {
            return console.log(err)
        };
        if (response) {
            return callback(null, response)
        }
    })
}
function updateDoc(data, callback) {
    if (data.hasOwnProperty('_id') !== true) {
        return callback(new Error('400Missing _id property from data'));
    }
    if (data.hasOwnProperty('_rev') !== true) {
        return callback(new Error('400Missing _rev property from data'));
    }

    db.put(data, function(err, response) {
        if (err) {
            return console.log(err)
        };
        console.log("you updated a doc" + response)
        if (response) {
            return callback(null, response)
        }
    })
    //-----Promise-------
    // db.put(data).then(function (response) {
    //   return callback(null,response)
    // }).catch(function (err) {
    //   console.log(err);
    // })
}
function getDocByID(data, callback) {

    db.get(data, function(err, response) {
        if (err) {
            console.log(err)
            return callback(err)

        };
        console.log(response)
        return callback(null, response)

    })
}

//-----Exported Functions

function createView(view) {
    db.put(view, function(err, response) {
        if (err) {
            console.log(err)
        }

        console.log("response: ", JSON.stringify(response, null, 2))

    })
}

function createPerson(data, callback) {
    if (data.hasOwnProperty('lastName') !== true) {
        return callback(new Error('400Missing lastName property within data'));
    }
    if (data.hasOwnProperty('firstName') !== true) {
        return callback(new Error('400Missing firstName property within data'));
    }
    if (data.hasOwnProperty('email') !== true) {
        return callback(new Error('400Missing email property within data'));
    }
    if (data.hasOwnProperty('_id') === true) {
        return callback(new Error('400 ID is not allowed within data'));
    }
    if (data.hasOwnProperty('_rev') === true) {
        return callback(new Error('400 Rev is not allowed within data'));
    }

    data._id = "person_" + data.email
    data.type = "person"
    data.active = true

    db.put(data, function(err, response) {
        if (err) {
            console.log(err)
            return callback(err)
        }
        console.log(response)
        return callback(null, response)
    })
};

function createReliefEffort(data, callback) {
    if (data.hasOwnProperty('phase') !== true) {
        return callback(new Error('400Missing phase property within data'));
    }
    if (data.hasOwnProperty('name') !== true) {
        return callback(new Error('400Missing name property within data'));
    }
    if (data.hasOwnProperty('organizationID') !== true) {
        return callback(new Error('400Missing organizationID property within data'));
    }
    if (data.hasOwnProperty('_id') === true) {
        return callback(new Error('400 ID is not allowed within data'));
    }
    if (data.hasOwnProperty('_rev') === true) {
        return callback(new Error('400 Rev is not allowed within data'));
    }

    data._id = 'relief_' + data.organizationID.replace(/ /g, "_").replace(/\./g, "") + '_' + data.name.replace(/ /g, "_");
    data.active = true
    data.type = "relief"

    db.put(data, function(err, response) {
        if (err) {
            console.log(err)
            return callback(err)
        }
        console.log("you created a Relief Effort" + response)
        return callback(null, response)
    })
}

function getPerson(data, callback) {
    getDocByID(data, callback);
}

function getReliefEffort(data, callback) {
    getDocByID(data, callback);
}

function updateReliefEffort(data, callback) {
    updateDoc(data, callback);
}

function updatePerson(data, callback) {
    updateDoc(data, callback);
}

function deletePerson(data, callback) {
    deleteDoc(data, callback);
}
function deleteReliefEffort(data, callback) {
    deleteDoc(data, callback);
}

function listPersons(sortBy, startKey, limit, callback) {
    queryDB(sortBy, startKey, limit, callback)
}
function listReliefEfforts(sortBy, startKey, limit, callback) {
    queryDB(sortBy, startKey, limit, callback)
}
function searchByLastName(ln, callback) {
    db.query('lastname', {
        include_docs: true,
        startkey: ln,
        endkey: ln + '\uffff'
    }, function(err, res) {
        if (err)
            return callback(err)
        callback(null, res)
    })
}

module.exports = dal;
