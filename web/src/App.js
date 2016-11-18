const React = require('react')
const { BrowserRouter, Match } = require('react-router')
const Persons = require('./pages/persons')
const ShowPerson = require('./pages/persons/show')
const PersonForm = require('./pages/persons/form')
const Db = require('./components/db')
const App = React.createClass({
  render() {
    return (
      <BrowserRouter>
        <div className="pa6">
          <div>
            <h3>Relief Tracker</h3>
          </div>
          <div>
            <Match exactly pattern="/persons" component={Db(Persons)} />
            <Match pattern="/persons/new" component={PersonForm} />
            <Match pattern="/persons/:id/show" component={ShowPerson} />

            {/* <Match exactly pattern="/reliefeffort/" component={Persons} />
            <Match pattern="/reliefeffort/new" component={PersonForm} />
            <Match pattern="/reliefeffort/:id/show" component={ShowPerson} /> */}

          </div>
        </div>
      </BrowserRouter>


    )
  }
})

module.exports = App
