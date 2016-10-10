import React, { Component, PropTypes } from 'react';

export default class Guest extends Component {

  render() {
    const guest = this.props.guest;
    return (
      <div>{guest.firstName} {guest.lastName}</div>
    );
  }
}

Guest.propTypes = {
  guest: PropTypes.object.isRequired,
};
