import React, { Component, PropTypes } from 'react';

// Guest component - represents a single todo item
export default class Guest extends Component {

  render() {
    const guest = this.props.guest;
    return (
      <li>{guest.firstName} {guest.lastName}</li>
    );
  }
}

Guest.propTypes = {
  guest: PropTypes.object.isRequired,
};
