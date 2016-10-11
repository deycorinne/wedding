import React, { Component, PropTypes } from 'react';
import { composeWithTracker } from 'react-komposer';
import { Guests } from '../api/guests.js';
import Guest from './guest.js';

export default class GuestList extends Component {

  render() {
    const guests = this.props.guests;
    console.log('guests', guests);
    return (
      <ul>
        { guests.map( guest => {
          return <li> <Guest key={ guest._id } guest={ guest } /> </li>
        } ) }
      </ul>
    );
  }
}

GuestList.propTypes = {
  guests: PropTypes.arrayOf( PropTypes.object ).isRequired,
};

const withGuests = composeWithTracker( function( props, onData ) {
  if( !Meteor.subscribe('guests').ready() ) return;
  const guests = Guests.find().fetch();
  onData( null, { guests });
});

export default withGuests(GuestList);
