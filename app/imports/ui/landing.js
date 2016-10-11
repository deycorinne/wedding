import React, { Component, PropTypes } from 'react';
import { composeWithTracker } from 'react-komposer';
import { Guests } from '../api/guests.js';
import Guest from './guest.js';

export default class App extends Component {

  constructor ( props, context ) {
    super( props, context );
  }

  submit = ( e ) => {
    e.preventDefault();

    const firstName = this.refs.firstName.value.trim();
    const lastName = this.refs.lastName.value.trim();
    const email = this.refs.email.value.trim();
    const data = { firstName, lastName, email };

    Meteor.call( 'insertGuest', data, () => {

    });
  }

  render() {
    return (
      <div className="container">
        <h1>Guest List</h1>

        <form className="new-guest" onSubmit={ this.submit.bind(this) } >
          <input type="text" ref="firstName" placeholder="First Name" />
          <input type="text" ref="lastName" placeholder="Last Name" />
          <input type="text" ref="email" placeholder="Email Address" />
          <button type="submit"> Submit </button>
        </form>

        <ul>
          { this.props.guests ? this.props.guests.map( guest => {
            return <li> <Guest key={guest._id} guest={ guest } /> </li>
          } ) : null }
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  guests: PropTypes.array.isRequired,
};

const withGuests = composeWithTracker( function( props, onData ) {
  if( !Meteor.subscribe('guests').ready() ) return;
  const guests = Guests.find().fetch();
  onData( null, { guests });
});

export default withGuests(App);
