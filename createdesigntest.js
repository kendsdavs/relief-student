var dalNoSQL = require('./DAL/no-sql.js');

var view = {
  _id: '_design/my_test',
  name: 'sample view',
  title: 'it works!'
}

var ringMyPhone = function(err, createdPersonInCouch) {
    if (err) {
        return err.message
    }

    return createdPersonInCouch
}
console.log(dalNoSQL.createView(view));
