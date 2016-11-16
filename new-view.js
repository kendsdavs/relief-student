const path = require('path');
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const fetchConfig = require('zero-config');

var config = fetchConfig(path.join(__dirname, '..'), {dcValue: 'test'});
const urlFormat = require('url').format;
const db = new PouchDB('http://127.0.0.1:5984/relief-tracker');
var dalNoSQL = require('./DAL/no-sql.js');

var relief_by_PhaseandName = {
    _id: "_design/relief_by_PhaseandName",
    language: "javascript",
    views: {
        relief_by_PhaseandName: {
            map: function(doc) {
                if (doc.type === 'relief') {
                    emit([doc.phase, doc.name], {
                      phase: doc.phase,
                      start: doc.start,
                      end: doc.end,
                    });
                }
            }.toString()
        }
    }
}

dalNoSQL.createView(relief_by_PhaseandName, function(err, data) {
  if (err) return console.log(err)
  if (data) {
    console.log(data)
  }
})
