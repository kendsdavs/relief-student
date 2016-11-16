-- CREATE DATABASE Relief_Tracker;
--
use Relief_Tracker;
--
-- CREATE TABLE `relief` (
--   `ID` int(11) unsigned NOT NULL AUTO_INCREMENT,
--   `name` varchar(50) NOT NULL,
--   `organizationID` varchar(50) NOT NULL,
--   `description` varchar(100) NOT NULL,
--   `start` date DEFAULT NULL,
--   `end` date DEFAULT NULL,
--   `phase` enum('planning','active','completed') DEFAULT 'planning',
--   PRIMARY KEY (`ID`),
--   UNIQUE KEY `name_UNIQUE` (`name`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;
--
INSERT INTO Relief_Tracker.relief
(name,
organizationID,
desc,
start,
end,
phase)

VALUES
('Haiti Relief 2017'
, 'St. Peters Catholic Church'
, 'Provide Clean Water to the citiizens of Haiti'
, '2017-01-05', '2017-01-12', 'planning'),
('African Aids Project'
, 'Doctor\'s With Out Borders'
, 'Provide medical care in southern Africa'
, '2017-02-10', '2017-03-10', 'planning'),
('Costa Rica Water Project 2016'
, 'Boys and Girls Club of New York'
, 'Provide water wells in rural villages across Costa Rica'
, '2016-06-05', '2016-06-27', 'completed'),
('Japan Earthquake 2015'
, 'EarthQuake Relief Team of the Americas'
, 'Assist with earthquake clean up, damage assessment and rebuilding'
, '2015-01-05', '2017-01-12', 'active'),
('Haiti Hurricane Matthew 2016'
, 'The Lions Club of Mt. Pleasant, SC'
, 'Assist with hurricane clean up and provide medical attention, food, and water'
, '2016-10-20', '2017-01-12', 'active');


-- CREATE TABLE `person` (
--   `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
--   `LastName` varchar(45) NOT NULL,
--   `FirstName` varchar(45) NOT NULL,
--   `email` varchar(45) NOT NULL,
--   `phone_num` varchar(12) DEFAULT NULL,
--   `active` tinyint(1) NOT NULL,
--   PRIMARY KEY (`id`),
--   UNIQUE KEY `email_UNIQUE` (`email`)
-- ) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=latin1;

INSERT INTO Relief_Tracker.person
(firstName,
lastName,
email,
phone,
active)
VALUES
('Mary','Johnson', 'marylovescats@gmail.com','808-555-6495', 1),
-- ('Sam','White', 'gowhitesocks@gmail.com','860-333-2363', 1),
-- ('Jessica','Jones', 'superhero@aol.com','452-443-1111', 1),
-- ('Karri','Smith', 'karri_smith_55@gmail.com','558-555-1144', 1),
-- ('Edward','Martin', 'mr_ed@gmail.com','303-955-4413', 1),
-- ('Gary','Adams', 'adams_family@gmail.com','433-222-9887', 0),
-- ('Laura','Adams', 'lauraforever@gmail.com','443-554-1123', 1),
-- ('Heather','Kahl', 'sofunforlife@gmail.com','454-766-4398', 1),
-- ('Joy','Bippus', 'babybooforyou@gmail.com','719-544-3793', 1),
-- ('Tom','Bandar', 'violajokesonme@gmail.com','775-987-3325', 1),
-- ('Sarah','Stenbakken', 'mrs.sarahS@gmail.com','303-114-8765', 0),
-- ('Grant','Scott', 'enginemaker@gmail.com','242-546-8876', 1),
-- ('Alex','Magalong', 'a_magalong_along@gmail.com','452-987-9914', 1);

-- CREATE TABLE `reliefTeam` (
--   `ID` int(10) unsigned NOT NULL AUTO_INCREMENT,
--   `personID` int(11) unsigned NOT NULL,
--   `reliefID` int(11) unsigned NOT NULL,
--   `role` enum('Team Leader','Team Member') COLLATE latin1_general_ci NOT NULL,
--   PRIMARY KEY (`ID`),
--   UNIQUE KEY `UI_reliefTeam_personID_reliefID` (`personID`,`reliefID`),
--   KEY `FK_reliefTeam_person_idx` (`personID`),
--   KEY `FK_reliefTeam_relief_idx` (`reliefID`),
--   CONSTRAINT `FK_reliefTeam_person` FOREIGN KEY (`personID`) REFERENCES `person` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
--   CONSTRAINT `FK_reliefTeam_relief` FOREIGN KEY (`reliefID`) REFERENCES `relief` (`ID`) ON DELETE CASCADE ON UPDATE NO ACTION
-- ) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=latin1 COLLATE=latin1_general_ci;
