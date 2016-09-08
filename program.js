/*jshint esversion: 6 */
////////////////////
//     NO SQL
////////////////////

// To run program.js from terminal, ensure you are in the correct directory
//  and run the following command:
// $ NODE_ENV=production node program.js

const dalNoSQL = require('./DAL/noSQL.js');

// person data. Use to test the createPerson() function within your DAL,
// Make INDIVIDUAL calls to the createPerson() function within your DAL
// with each person within the array.
const personDataJimmy = {
    firstName: "Jimmy",
    lastName: "Martin",
    phone: "404 394-2479",
    email: "JimmyMartinJr@gmail.com",
    type: "person",
    active: true
};

const personDataTom ={
   type: "person",
   firstName: "Tom",
   lastName: "Jefferson",
   phone: "843 444-4444"
};

const personDataWyatt = {
   firstName: "Wyatt",
   lastName: "Johnston",
   phone: "843 222-1212"
};

const personDataGary = {
   _id: "person_gary.johnson1971@gmail.com",
   _rev: "6-5345c34a6c31b82fe34ae2880dc33736",
   type: "person",
   firstName: "Gary",
   lastName: "Johnson",
   phone: "843 555-9876",
   email: "gary.johnson1971@gmail.com",
   active: true
};

const personDataJudy = {
   firstName: "Judy",
   lastName: "Jones",
   phone: "843 555-5555",
   email: "judy5555@aol.com",
};

const personDataLibby = {
   type: "person",
   firstName: "Libby",
   lastName: "Satterfield",
   phone: "843 888-8438",
   email: "lsat1972@gmail.com",
};

const personDataSteve = {
   type: "person",
   firstName: "Steve",
   lastName: "Ananias",
   phone: "843 555-1515",
   email: "stevean@duke.edu"
};

const createReliefEffortDataKatrina = {
   "phase": "completed",
   "name": "Hurricane Katrina 2005",
   "organizationID": "Hurricane Helpers",
   "desc": "Provide water purification systems. Hurricane Katrina was the eleventh named storm and fifth hurricane of the 2005 Atlantic hurricane season. It was the costliest natural disaster, as well as one of the five deadliest hurricanes, in the history of the United States.",
   "start": "2005-08-23",
   "end": "2005-09-31",
   "active": true
};

const createReliefEffortDataHaiti2015 ={
   "_id": "relief_St_Phillips_Haiti_2015",
   "type": "relief",
   "phase": "completed",
   "tags": [
       "education"
   ],
   "name": "Haiti 2015",
   "organizationID": "St. Phillips",
   "desc": "Build school desks and blackboards at the St. Esprit (Holy Spirit) church and school in the remote village of Gros Mangle in the island of La Gonave, Haiti. Home base is located in the main town of Anse - à - Galets at the St.François d’ Assise church and school.",
   "start": "2015-09-25",
   "end": "2015-10-01",
   "social": [
   ],
   "team": [
       {
           "name": "Steve Ananias",
           "role": "Team Leader",
           "personID": "person_stevean@duke.edu"
       },
       {
           "name": "Libby Satterfield",
           "role": "Team member",
           "personID": "person_lsat1972@gmail.com"
       },
       {
           "name": "Judy Jones",
           "role": "Team member",
           "personID": "person_judy5555@aol.com"
       }
   ],
   "objectives": [
       {
           "id": "1",
           "name": "Build desks",
           "type": "primary",
           "description": "Build desks for the school in Gros Mangles.",
           "order ": 1,
           "completed": true,
           "successFactor": 5
       },
       {
           "id": "2",
           "name": "Build blackboards",
           "type": "secondary",
           "description ": "Build blackboards for school rooms",
           "order ": 2,
           "completed": true,
           "successFactor": 5
       },
       {
           "id": "3",
           "name": "Deliver generator",
           "type": "secondary",
           "description ": "Deliver gas powered generator church/school in Anse-a-Galets.",
           "order ": 3,
           "completed": false,
           "successFactor": 1
       }
   ],
   "map": [
       {
           "name": "La Gonave",
           "center": {
               "lat": 18.831768,
               "lng": -72.866371
           },
           "markers": [
               {
                   "title": "Anse-a-Galets",
                   "label": "Home Base",
                   "color": "",
                   "position": {
                       "lat": 18.831768,
                       "lng": -72.866371
                   }
               },
               {
                   "title": "Gros Mangle",
                   "label": "Objective",
                   "color": "",
                   "position": {
                       "lat": 18.927275,
                       "lng": -73.104122
                   }
               }
           ]
       }
   ]
};


const createReliefEffortDataHaiti2017 =  {
   "type": "relief",
   "phase": "planning",
   "tags": [
       "dental",
       "medical",
       "economic development"
   ],
   "name": "Haiti 2017",
   "organizationID": "St. Phillips",
   "desc": "Provide dental services, education, and supplies to the village of Gros Mangle on the island of La Gonave, Haiti.  Island of La Gonave, Haiti. Home base is located in the main town of Anse - à - Galets at the St.François d’ Assise church and school.The bulk of the mission work will take place at St.Esprit(Holy Spirit) church and school in the remote village of Gros Mangle, Haiti.The team will consist of team leaders, dentists, and dental hygienists.",
   "start": "2016-11-01",
   "end": "2016-11-08",
   "social": [
   ],
   "team": [
       {
           "name": "Steve Harvey",
           "role": "Team Leader",
           "personID": "person_steveharvey1111@gmail.com"
       },
       {
           "name": "Libby Satterfield",
           "role": "Team member",
           "personID": "person_lsat1972@gmail.com"
       },
       {
           "name": "Jimmy Martin",
           "role": "Team member",
           "personID": "person_JimmyMartinJr@gmail.com"
       }
   ],
   "objectives": [
       {
           "id": "123",
           "name": "Dental Services",
           "type": "primary",
           "description": "Provide dental services to the village of Gros Mangles on the island of La Gonave, Haiti at the St. Esprit church and school.",
           "order ": 1,
           "completed": false,
           "successFactor": 0
       },
       {
           "id": "456",
           "name": "Economic Development",
           "type": "secondary",
           "description ": "Prepare economic development opportunities.  Meet with village leaders in preparation for teaching the villagers to make crafts in order to provide income.",
           "order ": 2,
           "completed": false,
           "successFactor": 0
       },
       {
           "id": "678",
           "name": "Medical Supplies",
           "type": "secondary",
           "description ": "Collect and provide medical supplies including dental hygiene kits, first aid kits and over the counter medication for the people of La Gonave.",
           "order ": 4,
           "completed": false,
           "successFactor": 0
       },
       {
           "id": "111",
           "name": "Generator",
           "type": "secondary",
           "description ": "Deliver gas powered generator.",
           "order ": 3,
           "completed": false,
           "successFactor": 0
       }
   ],
   "map": [
       {
           "name": "La Gonave",
           "center": {
               "lat": 18.831768,
               "lng": -72.866371
           },
           "markers": [
               {
                   "title": "Anse-a-Galets",
                   "label": "Home Base",
                   "color": "",
                   "position": {
                       "lat": 18.831768,
                       "lng": -72.866371
                   }
               },
               {
                   "title": "Gros Mangle",
                   "label": "Objective",
                   "color": "",
                   "position": {
                       "lat": 18.927275,
                       "lng": -73.104122
                   }
               }
           ]
       }
   ]
}

const createReliefEffortDataKenya2015 = {
   "phase": "completed",
   "name": "Kenya 2015",
   "organizationID": "St. Phillips",
   "desc": "Build school in Kenya",
   "start": "2015-01-05",
   "end": "2015-02-15"
}

const createReliefEffortDataKenya2016 = {
   "type": "relief",
   "phase": "completed",
   "name": "Kenya 2016",
   "organizationID": "St. Phillips",
   "desc": "Build hospital in Kenya",
   "start": "2016-01-05",
   "end": "2016-02-15",
   "active": true
}

console.log(dalNoSQL.getDBInfo());
