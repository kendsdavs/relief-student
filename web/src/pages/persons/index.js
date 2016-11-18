const React = require('react')
const Persons = React.createClass({
  getInitialState() {
    return {
      persons: []
    }
  },
  componentDidMount() {
    this.props.db.all((err, response, body) => {
      if (err) return console.log(err)
      const persons = body.rows.map(o => o.doc)
      console.log(body)
      this.setState({ persons })
    })
  },
  render() {
    const Person = p =>
      <li key={p._id}>
        <p>{p.firstName + " " + p.lastName}</p>
      </li>
    return (
      <div>
        <h3>Persons</h3>
        <ul>
          {this.state.persons.map(Person)}

        </ul>
      </div>
    )
  }
})

module.exports = Persons
