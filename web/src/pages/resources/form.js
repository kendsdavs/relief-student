const React = require('react')
//const dbUrl = process.env.REACT_APP_DB
//const PouchDB = require('pouchdb-http')
//const db = PouchDB(dbUrl)
const xhr = require('xhr')


const ResourceForm = React.createClass({
  postForm: function(person) {
      xhr({
          method: 'POST',
          json: person,
          url: 'http://localhost:4000/persons'
      }, (err, res, body) => {
          if (err) {
              return console.log(err.message)
          }
          this.setState({ resource: body })
      })
  },
  getInitialState() {
    return {
      resource: {
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
        //, _id: new Date().toISOString()
      }
    }
  },
  handleChange(field) {
    return e => {
      let resource = this.state.resource
      resource[field] = e.target.value
      this.setState({resource})
      console.log(this.state.resource)
    }
  },
  handleSubmit(e) {
    e.preventDefault()
    this.postForm(this.state.resource)
    console.log("this state resource", this.state.resource )
    // db.put(this.state.resource, (err, result) => {
    //   if(err) return this.setState({error: err.message})
    //   this.setState({ result: result })
    // })
  },
  render() {
    return(
      <div>
        {this.state.error}
        {this.state.result}
      <form onSubmit={this.handleSubmit}>
        <div>
          <label>First Name</label>
          <input
            onChange={this.handleChange('firstName')}
            value={this.state.resource.firstName} />
        </div>
        <div>
          <label>Last Name</label>
          <input
            onChange={this.handleChange('lastName')}
            value={this.state.resource.lastName} />
        </div>
        <div>
          <label>Email</label>
          <input
            onChange={this.handleChange('email')}
            value={this.state.resource.email} />
        </div>
        <div>
          <label>Phone</label>
          <input
            onChange={this.handleChange('phone')}
            value={this.state.resource.phone} />
        </div>
        <div>
          <button>Submit</button>
        </div>
      </form>
      <hr />
      <pre>{JSON.stringify(this.state.resource)}</pre>
    </div>
    )
  }



})

module.exports = ResourceForm
