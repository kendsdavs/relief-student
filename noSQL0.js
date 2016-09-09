/*jshint esversion: 6 */

const path = require('path');
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const fetchConfig = require('zero-config');
const uuid = require('node-uuid');

var config = fetchConfig(path.join(__dirname, '..'), {
    dcValue: 'test'
});

const couch_base_uri = config.get("couch.baseURI") + ':' + config.get("couch.port") + "/";
const couch_dbname = config.get("couch.dbName");
const db = new PouchDB(couch_base_uri + couch_dbname);


function getDBInfo() {
    // TODO:  Grab db info from database and return with success message
    return "Success!";
}

// function createPerson(data, callback) {
// }


function createPerson(data, callback) {
    // Call to couch retrieving a document with the given _id value.
    if (typeof data == "undefined" || data === null) {
        return callback(new Error('Missing data for create'));
    } else if (data.hasOwnProperty('_id') === true) {
        return callback(new Error('Unnecessary _id property within data. ' +
            'createPerson() will generate a unique _id'));
    } else if (data.hasOwnProperty('_rev') === true) {
        return callback(new Error('Unnecessary _rev property within data'));
    } else if (data.hasOwnProperty('lastName') !== true) {
        return callback(new Error('Missing lastName property within data'));
    } else if (data.hasOwnProperty('firstName') !== true) {
        return callback(new Error('Missing firstName property within data'));
    } else if (data.hasOwnProperty('email') !== true) {
        return callback(new Error('Missing email property within data'));
    } else {
        if (data.hasOwnProperty('active') !== true) {
            data.active = true;
        }
        data.type = 'person';
        data._id = 'person_' + data.email;

        db.put(data, function(err, response) {
            if (err) return callback(err);
            if (response) return callback(null, response);
        });
    }
}

var dal = {
    getDBInfo: getDBInfo,
    createPerson: createPerson
};

module.exports = dal;
