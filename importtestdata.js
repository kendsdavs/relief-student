const dalNoSQL = require('./DAL/no-sql.js');
const peopleData = [{
      firstName: "Jimmy",
      lastName: "Martin",
      phone: "404 394-2479",
      email: "JimmyMartinJr@gmail.com"
  }, {
      firstName: "Tom",
      lastName: "Jefferson",
      phone: "843 444-4444",
      email: "TJ@dentalone.com"
  }, {
      firstName: "Wyatt",
      lastName: "Johnston",
      phone: "843 222-1212",
      email: "WyattJ1111@gmail.com"
  }, {
      firstName: "Gary",
      lastName: "Johnson",
      phone: "843 555-9876",
      email: "gary.johnson1971@gmail.com"
  }, {
      firstName: "Judy",
      lastName: "Jones",
      phone: "843 555-5555",
      email: "judy5555@aol.com"
  }, {
      firstName: "Libby",
      lastName: "Satterfield",
      phone: "843 888-8438",
      email: "lsat1972@gmail.com"
  }, {
      firstName: "Steve",
      lastName: "Ananias",
      phone: "843 555-1515",
      email: "stevean@duke.edu"
  }, {
    "firstName": "Buddy2",
    "lastName": "Cinq",
    "phone": "843 555-5555",
    "email": "buddyFive@jrscode.edu",
    "type": "person",
    "active": true
  }, {
    "firstName": "Person",
    "lastName": "Two",
    "phone": "843 123-4567",
    "email": "person2@jrscode.edu"
  }, {
    "firstName": "Brohim",
    "lastName": "Quatro",
    "phone": "843 444-4444",
    "email": "quatrobro@jrscode.edu"
  }, {
    "firstName": "Athrid",
    "lastName": "Dude",
    "phone": "843 987-5687",
    "email": "third_dude@jrscode.edu"
  }]
const reliefEffortData = [{
      "phase": "completed",
      "name": "Hurricane Hugo 1989",
      "organizationID": "Hurricane Helpers",
      "desc": "Purricane Hugo was a powerful Cape Verde-type hurricane that caused widespread damage and loss of life in the Leeward Islands, Puerto Rico, and the Southeast United States in 1989",
      "start": "1989-09-10",
      "end": "1989-09-25"
  }, {
      "phase": "completed",
      "name": "Haiti 2015",
      "organizationID": "St. Phillips",
      "desc": "Build school desks and blackboards at the St. Esprit (Holy Spirit) church and school in the remote village of Gros Mangle in the island of La Gonave, Haiti. Home base is located in the main town of Anse - à - Galets at the St.François d’ Assise church and school.",
      "start": "2015-09-25",
      "end": "2015-10-01",
      "team": [{
          "name": "Steve Ananias",
          "role": "Team Leader",
          "personID": "person_stevean@duke.edu"
      }, {
          "name": "Libby Satterfield",
          "role": "Team member",
          "personID": "person_lsat1972@gmail.com"
      }, {
          "name": "Judy Jones",
          "role": "Team member",
          "personID": "person_judy5555@aol.com"
      }]
  }, {
      "phase": "planning",
      "name": "Haiti 2017",
      "organizationID": "St. Phillips",
      "desc": "Provide dental services, education, and supplies to the village of Gros Mangle on the island of La Gonave, Haiti.  Island of La Gonave, Haiti. Home base is located in the main town of Anse - à - Galets at the St.François d’ Assise church and school.The bulk of the mission work will take place at St.Esprit(Holy Spirit) church and school in the remote village of Gros Mangle, Haiti.The team will consist of team leaders, dentists, and dental hygienists.",
      "start": "2016-11-01",
      "end": "2016-11-08",
      "team": [{
          "name": "Steve Harvey",
          "role": "Team Leader",
          "personID": "person_steveharvey1111@gmail.com"
      }, {
          "name": "Libby Satterfield",
          "role": "Team member",
          "personID": "person_lsat1972@gmail.com"
      }, {
          "name": "Jimmy Martin",
          "role": "Team member",
          "personID": "person_JimmyMartinJr@gmail.com"
      }]
  }, {
      "phase": "completed",
      "name": "Kenya 2015",
      "organizationID": "St. Phillips",
      "desc": "Build school in Kenya",
      "start": "2015-01-05",
      "end": "2015-02-15"
  }, {
      "phase": "completed",
      "name": "Kenya 2016",
      "organizationID": "St. Phillips",
      "desc": "Build hospital in Kenya",
      "start": "2016-01-05",
      "end": "2016-02-15",
  }, {
      "phase": "completed",
      "name": "Indo 2005",
      "organizationID": "UN",
      "desc": "Boxing Day tsunami help relief.",
      "start": "2005-12-26",
      "end": "2005-12-31",
      "team": [
        {
          "name": "Billy Bob Goatsy",
          "role": "Team Leader",
          "personID": "bbgoat@protonmail.com"
        },
        {
          "name": "Violet Swester",
          "role": "Team member",
          "personID": "vswester@gmail.com"
        },
        {
          "name": "Huff Retwald",
          "role": "Team member",
          "personID": "huffret@aol.com"
        }
      ]
  }, {
    "phase": "start",
    "name": "Lumberton 2016",
    "organizationID": "UN",
    "desc": "Hurricane Matthew relief help.",
    "start": "2016-10-09",
    "end": "2016-10-15"
  }, {
    "name": "New York City 2001",
    "organizationID": "UN",
    "desc": "September 11th relief help.",
    "start": "2001-09-12",
    "end": "2001-12-15"
  }, {
    "phase": "start",
    "name": "New Zealand 2012",
    "organizationID": "UN",
    "desc": "Earthquake relief help.",
    "start": "2012-10-25",
    "end": "2012-12-01",
    "team": [
      {
        "name": "Sookie Stackhouse",
        "role": "Team Leader",
        "personID": "sookies@protonmail.com"
      },
      {
        "name": "Terry Belflor",
        "role": "Team member",
        "personID": "terry_belfor@gmail.com"
      },
      {
        "name": "Tara Thornton",
        "role": "Team member",
        "personID": "tara.thornton@aol.com"
      }
    ]
  }]
function callback (msgHeader) {
  return function (err, response) {
    if (err) return console.log('ERROR:\n', err.message)
    return console.log(msgHeader, response)
  }
}
peopleData.forEach(function(person) {
  dalNoSQL.createPerson(person, callback('PERSON CREATED:\n'))
})
reliefEffortData.forEach(function(reliefEffort, index) {
  dalNoSQL.createReliefEffort(reliefEffort, callback('RELIEF EFFORT CREATED:\n'))
})
