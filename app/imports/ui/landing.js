import React, { Component, PropTypes } from 'react';
import GuestList from './guest-list.js';
import GuestForm from './guest-form.js';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <h1>Welcome!</h1>

        <GuestForm />
        <GuestList />
      </div>
    );
  }
}
