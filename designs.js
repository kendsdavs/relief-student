const path = require('path');
const PouchDB = require('pouchdb-http');
PouchDB.plugin(require('pouchdb-mapreduce'));
const fetchConfig = require('zero-config');

var config = fetchConfig(path.join(__dirname, '..'), {dcValue: 'test'});
const urlFormat = require('url').format;
const db = new PouchDB('http://127.0.0.1:5984/relief-tracker');
var dalNoSQL = require('./DAL/no-sql.js');


var ddoc= {
  _id: '_design/emailView2',
  views: {
    emailView2: {
      map: function (doc) {
        if(doc.type === 'person'){
          emit(doc.email + doc._id);
        }
      }.toString()
    }
  }
};

var lastName = {
  _id: '_design/lastname',
  views: {
    lastname: {
      map: function (doc) {
        if(doc.type === 'person'){
          emit(doc.lastName + doc._id)
        }
      }.toString()
    }
  }
};

var ddoc3 = {
  _id: '_design/reliefEffortsView',
  views: {
    reliefEffortsView: {
      map: function (doc) {
        if(doc.type === 'relief'){
          emit(doc.name)
        }
      }.toString()
    }
  }
};

// db.query('emailView', {
//   include_docs: true
// }).then(function (res) {
//   // index was built!
//   console.log(res)
// }).catch(function (err) {
//   // some error
//   console.log(err)
// });

//createView(ddoc)
// dalNoSQL.createView(ddoc, function(err, data) {
//   if (err) return console.log(err)
//   if (data) {
//     console.log(data)
//   }
// })
// dalNoSQL.createView(lastName, function(err, data) {
//   if (err) return console.log(err)
//   if (data) {
//     console.log(data)
//   }
// })
dalNoSQL.createView(ddoc3, function(err, data) {
  if (err) return console.log(err)
  if (data) {
    console.log(data)
  }
})
