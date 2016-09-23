/*jshint esversion: 6 */
// MY SQL

//var dalMySQL = require('./DAL/mySQL.js');

// dalMySQL.getPerson(6, function callback(err, data) {
//     if (err) return console.log(err);
//     if (data) {
//         console.log(data);
//     }
// });

// var data = {
//     "type": "relief",
//     "phase": "completed",
//     "name": "Hurricane Jeff 1987",
//     "organizationID": "Hurricane Helpers",
//     "desc": "Provide water purification systems. Hurricane Jeff was the eleventh named storm and fifth hurricane of the 2005 Atlantic hurricane season. It was the costliest natural disaster, as well as one of the five deadliest hurricanes, in the history of the United States.",
//     "start": "2005-08-23",
//     "end": "2005-09-30",
//     "team": [
//      {
//             "name": "Libby Satterfield",
//             "role": "Team Member",
//             "personID": 11
//      },
//      {
//          "name": "Steve Ananias",
//          "role": "Team Leader",
//          "personID": 6
//      },
//
//      {
//          "name": "Judy Jones",
//          "role": "Team Member",
//          "personID": 10
//      }
//  ]
// };
//
// dalMySQL.createReliefEffort(data, function callback(err, response) {
//     if (err) return console.log(err);
//     if (response) return console.log(response);
// });

// const sortBy = 'reliefName';
// const searchCriteria = '';
// const limit = 3;
//
// dalMySQL.listReliefEfforts(sortBy, searchCriteria, limit, function callback(err, data) {
//    if (err) return console.log(err);
//    if (data) {
//       console.log(JSON.stringify(data, null ,2));
//    }
// })

// var data = {
//     firstName: "Jackie",
//     lastName: "Onassis",
//     phone: "394 111-1111",
//     email: "jackiekennedyo1922@gmail.org"
//  };
//
//  dalMySQL.createPerson(data, function callback (err, response) {
//      if (err) return console.log(err);
//      if (response) return console.log(response);
//  });

// var data = {
//     _id:  19,
//     firstName: "Jackie",
//     lastName: "Onassis",
//     phone: "394 333-3333",
//     email: "jackiekennedyo1933@gmail.com"
//  };
//
//  dalMySQL.updatePerson(data, function callback (err, response) {
//      if (err) return console.log(err);
//      if (response) return console.log(response);
//  });

// var data = {
//     _id:  19,
//     firstName: "Jackie",
//     lastName: "Onassis",
//     phone: "394 333-3333",
//     email: "jackiekennedyo1933@gmail.com"
//  };
//
//  dalMySQL.deletePerson(data, function callback (err, response) {
//      if (err) return console.log(err);
//      if (response) return console.log(response);
//  });

// var data = {
//     _id:  18,
//     firstName: "Steve",
//     lastName: "Harvey",
//     phone: "404 303-1112",
//     email: "steveharvey2222@gmail.com",
//     type: "person",
//     active: true
//  };
//
//  dalMySQL.updatePerson(data, function callback (err, response) {
//      if (err) return console.log(err);
//      if (response) return console.log(response);
//  });

// const sort = 'lastName';
// //const search = 'stevean1@duke.edu';
// const search = '';
// const limit = 3;
//
// dalMySQL.listPersons(sort, search, limit ,function callback(err, data) {
//    if (err) return console.log(err);
//    if (data) {
//        console.log(data);
//    }
// })




////////////////////
//     NO SQL
////////////////////
//
var dalNoSQL = require('./DAL/no-sql-complete.js');
console.log(dalNoSQL.getDBInfo());

// dalNoSQL.getReliefEffort('relief_St_Phillips_Haiti_2017', function callback(err, data) {
//     if (err) return console.log(err);
//     if (data) {
//         console.log(JSON.stringify(data, null, 2));
//     }
// });

// const sortBy = 'reliefEfforts';
// const searchCriteria = 'Haiti 2015';
// const limit = 3;
//
// dalNoSQL.listReliefEfforts(sortBy, searchCriteria, limit, function callback(err, data) {
//    if (err) return console.log(err);
//    if (data) {
//       console.log(JSON.stringify(data, null ,2));
//    }
// })

// var data = {
//     firstName: "Jimmy",
//     lastName: "Martin",
//     phone: "404 394-2479",
//     email: "JimmyMartinJr@gmail.com",
//     type: "person",
//     active: true
//  };
//
//  dalNoSQL.createPerson(data, function callback (err, response) {
//      if (err) return console.log(err);
//      if (response) return console.log(response);
//  });

// var data = {
//     "type": "relief",
//     "phase": "completed",
//     "name": "Hurricane Katrina 2005",
//     "organizationID": "Hurricane Helpers",
//     "desc": "Provide water purification systems. Hurricane Katrina was the eleventh named storm and fifth hurricane of the 2005 Atlantic hurricane season. It was the costliest natural disaster, as well as one of the five deadliest hurricanes, in the history of the United States.",
//     "start": "2005-08-23",
//     "end": "2005-09-31"
// };
//
// dalNoSQL.createReliefEffort(data, function callback(err, response) {
//     if (err) return console.log(err);
//     if (response) return console.log(response);
// });

// var designDoc = {
//   _id: '_design/reliefEfforts',
//   views: {
//     'reliefEfforts': {
//       map: function(doc) {
//         if (doc.type === 'relief') {
//           emit(doc.name);
//         }
//       }.toString()
//     }
//   }
// }
//
// dalNoSQL.createView(designDoc, function callback(err, data) {
//    if (err) return console.log(err);
//    if (data) {
//        console.log(data);
//    }
// })





// const sortBy = 'emailView';
// const searchCriteria = 'lsat1972@gmail.com';
// const limit = 3;
//
// dalNoSQL.listPersons(sortBy, searchCriteria, limit, function callback(err, data) {
//    if (err) return console.log(err);
//    if (data) {
//       console.log(JSON.stringify(data, null ,2));
//    }
// })

// dalNoSQL.getPerson('badid', function callback(err, data) {
//     if (err) return console.log(err);
//     if (data) {
//         console.log(data);
//     }
// });

// dalNoSQL.getPerson('person_stevean@duke.edu', function callback(err, data) {
//     if (err) return console.log(err);
//     if (data) {
//         console.log(data);
//     }
// });



// dalNoSQL.getPerson('person_SmithRobin4a933181-d863-48ce-8813-64a116261b69', function callback(err, data) {
//     if (err) return console.log(err);
//     if (data) {
//         console.log(data);
//         dalNoSQL.deletePerson(data, function callback(err, data) {
//             if (err) return console.log(err);
//             if (data) {
//                 console.log(data);
//             }
//         });
//     }
// });

// dalNoSQL.getPerson('person_JohnsonGary2a36b256-40a2-44dc-b30a-bcc894639dac', function callback(err, data) {
//     if (err) return console.log(err);
//     if (data) {
//         console.log(data);
//         data.email = 'gary.johnson1971@gmail.com';
//         dalNoSQL.updatePerson(data, function callback(err, response) {
//             if (err) return console.log(err);
//             if (response) return console.log(response);
//         });
//     }
// });
