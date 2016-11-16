// Our API goes here!
const express = require('express')
const app = express()
const port = process.env.PORT || 4000;

const HTTPError = require('node-http-error');
const dal = require('../DAL/no-sql.js');
//const dal = require('../DAL/my-sql.js');
var bodyParser = require('body-parser');
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())

//middleware for body parsing
//var jsonParser = bodyParser.json()

app.get('/', function(req, res) {
    res.send('hello world')
})

app.get('/bad', function(req, res, next) {
    var firstErr = new HTTPError(500, 'error', {m: "Please try another route"}) //can add extra info for dev
    return next(firstErr)
})

app.get('/reliefefforts/:id', function(req, res, next) {
    const reliefEffortID = req.params.id
    console.log("relief id is: ", reliefEffortID)
    // res.status(200).send({
    //   "reliefEffortID": reliefEffortID
    // })

    dal.getReliefEffort(reliefEffortID, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            //console.log("Error calling dal.getReliefEffort", err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            res.append('Content-type', 'application/json');
            res.send(data);
        }
    })
})
app.get('/persons/:id', function(req, res, next) {
    const personID = req.params.id
    console.log("person id is: ", personID)
    // res.status(200).send({
    //   "personID": personID
    // })

    dal.getPerson(personID, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            //console.log("Error calling dal.getReliefEffort", err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            res.append('Content-type', 'application/json');
            res.send(data);
        }
    })
})

app.post('/persons', function(req, res, next) {
    console.log(req.body)
    // create user in req.body
    dal.createPerson(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            //console.log("Error calling dal.getReliefEffort", err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            res.send(data)
        }
    })
})

app.post('/reliefefforts', function(req, res, next) {
    console.log(req.body)
    // create user in req.body
    dal.createReliefEffort(req.body, function(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            //console.log("Error calling dal.getReliefEffort", err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            res.send(data)
        }
    })
})

app.put('/persons/:id', function(req, res, next) {
    console.log('req.params.id', req.params.id )
    dal.getPerson(req.params.id, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data)
        console.log("req body", req.body["_id"], "data id", data["_id"] )
            //req.body["_id"] = data["_id"]
            //req.body["_rev"] = data["_rev"]
        dal.updatePerson(req.body, function callback(updatederror, updateddata) {
            if (updatederror) {
                var responseError = BuildResponseError(updatederror)
                //console.log("Error calling dal.getReliefEffort", err)
                return next(new HTTPError(responseError.status, responseError.message))
            }
            if (updateddata) {
                console.log("DELETE " + req.path, updateddata)
                res.append('Content-type', 'application/json')
                res.status(200).send(updateddata)
            }
        })
    })
})

app.put('/reliefefforts/:id', function(req, res, next) {
  console.log("UPDATING relief number ", req.params.id)
    dal.getReliefEffort(req.params.id, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data)
        console.log("Id being passed into update ", data)
           req.body["_id"] = JSON.parse(data)["_id"]
        // console.log("req.body ", req.body)
            req.body["_rev"] = data["_rev"]
        dal.updateReliefEffort(req.body, function callback(updatederror, updateddata) {
            if (updatederror) {
                var responseError = BuildResponseError(updatederror)
                //console.log("Error calling dal.getReliefEffort", err)
                return next(new HTTPError(responseError.status, responseError.message))
            }
            if (updateddata) {
                console.log("here is the updateddata ", updateddata)
                res.append('Content-type', 'application/json')
                res.status(200).send(updateddata)
            }
        })
    })
})
//kendras
app.delete('/persons/:id', function(req, res, next) {
    const personID = req.params.id;
    console.log("trying to delete", personID)

    dal.getPerson(personID, function callback(err, data) {
        console.log("getPerson", personID)
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            console.log("make your data look like this", data)
            console.log("data._id", JSON.parse(data)._id)
            dal.removePerson(data, function callback(deletederr, deleteddata) {
                if (deletederr) {
                    var responseError = BuildResponseError(deletederr)
                    return next(new HTTPError(responseError.status, responseError.message))
                }
                if (deleteddata) {
                    console.log("DELETE " + req.path, deleteddata)
                    res.append('Content-type', 'application/json')
                    res.status(200).send(deleteddata)
                }

            })
        }
    })
})

app.delete('/reliefefforts/:id', function(req, res, next) {
    const reliefID = req.params.id;
    // res.status(200).send({
    //   "personID": personID
    // })
    dal.getReliefEffort(reliefID, function callback(err, data) {
        console.log('dal.getReliefEffort', reliefID)
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data)
            dal.removeReliefEffort(data, function callback(deletederror, deleteddata) {
                if (deletederror) {
                    console.log('oh no!', deletederror)
                    var responseError = BuildResponseError(deletederror)
                    //console.log("Error calling dal.getReliefEffort", err)
                    return next(new HTTPError(responseError.status, responseError.message))
                }
                if (deleteddata) {
                    console.log("DELETE " + req.path, deleteddata)
                    res.append('Content-type', 'application/json')
                    res.status(200).send(deleteddata)
                }
            })
    })
})
app.get('/persons', function(req, res, next) {
    //const sortByParam = req.query.sortby || 'lastname';
    //const sortBy = getReliefEffortSortBy(sortByParam, dalModule);
    //const sortBy = sortByParam
    const sortToken = req.query.sorttoken || '';
    const limit = req.query.limit || 5;

    dal.listPersons(sortBy, sortToken, limit, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            console.log("HERE is the list from " + req.path, data)
            res.append('Content-type', 'application/json')
            res.status(200).send(data)
        }
    })
})

app.get('/reliefefforts', function(req, res, next) {
    //const sortByParam = req.query.sortby || 'reliefEffortsView';
    //const sortBy = getReliefEffortSortBy(sortByParam, dalModule);
    //const sortBy = sortByParam
    const sortToken = req.query.sorttoken || '';
    const limit = req.query.limit || 5;

    dal.listReliefEfforts(sortBy, sortToken, limit, function callback(err, data) {
        if (err) {
            var responseError = BuildResponseError(err)
            return next(new HTTPError(responseError.status, responseError.message))
        }
        if (data) {
            console.log("HERE is a list " + req.path, data)
            res.append('Content-type', 'application/json')
            res.status(200).send(data)
        }
    })
})

function BuildResponseError(err) {

    // no sql error message example
    //     { id: 'person_jackiekennedyo1922@gmail.org',
    // error: 'conflict',
    // reason: 'Document update conflict.',
    // name: 'conflict',
    // status: 409,
    // message: 'Document update conflict.',
    // ok: true }
    //
    // // custom DAL validation message example
    //
    // {
    // error: 'Bad Request',
    // reason: 'Unnecessary _id property within data.'
    // name: 'Bad Request',
    // status: 400,
    // message: 'Unnecessary _id property within data.',
    // ok: true }

    // if the first three characters are a number then return the error code otherwise
    //  default to 400 (bad request)
    const statuscheck = isNaN(err.message.substring(0, 3)) === true
        ? "400"
        : err.message.substring(0, 3)
    const status = err.status
        ? Number(err.status)
        : Number(statuscheck)
    const message = err.status
        ? err.message
        : err.message.substring(3)
    const reason = message
    const error = status === 400
        ? "Bad Request"
        : err.name
    const name = error

    var errormsg = {}
    errormsg.error = error
    errormsg.reason = reason
    errormsg.name = name
    errormsg.status = status
    errormsg.message = message

    //   { error: 'Bad Request',
    // reason: 'Missing email property within data',
    // name: 'Bad Request',
    // status: 400,
    // message: 'Missing email property within data' }
    console.log("BuildResponseError-->", errormsg)
    return errormsg
}

// middleware for errors
app.use(function(err, req, res, next) {
    console.log(req.method, " ", req.path, " err: ", err)
    res.status(err.status || 500)
    res.send(err)
})

app.listen(4000, function() {
    console.log('Example app listening on port 4000!');
});
