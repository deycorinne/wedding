import React, { Component, PropTypes } from 'react';
import Guest from './guest.js';

export default class GuestForm extends Component {

  save = ( e ) => {
    console.log('save was called');
    if(e && e.preventDefault) e.preventDefault();

    const firstName = this.refs.firstName.value.trim();
    const lastName = this.refs.lastName.value.trim();
    const email = this.refs.email.value.trim();
    const data = { firstName, lastName, email };
    console.log('data', data);
    var guest = new Guest( );

    guest.firstName = firstName;
    guest.lastName = lastName;
    guest.email = email;
    guest.save();
    return false;
  }

  render() {
    return (
      <form className="new-guest">
        <input type="text" ref="firstName" id="firstName" placeholder="First Name" />
        <input type="text" ref="lastName" id="lastName" placeholder="Last Name" />
        <input type="text" ref="email" id="email" placeholder="Email Address" />
        <button type="button" onClick={ this.save.bind(this) }> Submit </button>
      </form>
    );
  }
}
