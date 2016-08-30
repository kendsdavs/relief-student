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


var dal = {
    getDBInfo: getDBInfo
};

module.exports = dal;

function getDBInfo() {
    return "Success!"
}
