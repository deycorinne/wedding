import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Guests } from '../api/guests.js';

import Guest from './guest.js';

// App component - represents the whole app
class App extends Component {
  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Guests.insert({
      text,
      createdAt: new Date(), // current time
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  renderGuests() {
    console.log(this.props);
    return this.props.guests.map((guest) => (
      <Guest key={guest._id} guest={guest} />
    ));
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Guest List</h1>

          <form className="new-guest" onSubmit={this.handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new guests"
            />
          </form>
        </header>

        <ul>
          {this.renderGuests()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  guests: PropTypes.array.isRequired,
};

export default createContainer(() => {
  return {
    guests: Guests.find({}, { sort: { createdAt: -1 } }).fetch(),
  };
}, App);
