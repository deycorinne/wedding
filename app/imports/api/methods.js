import { Meteor } from 'meteor/meteor';
import { Guests } from './guests.js';

Meteor.methods({
  insertGuest: function () {
    check( data, Object );

    var guest = new Guest( );

    guest.firstName = data.firstName;
    guest.lastName = data.lastName;
    guest.email = data.email;
    guest.save();
  },

  invite: function ( _id ) {
    check( _id , String );
    const guest = Guests.findOne( { _id } );
    // TODO: email invite to them
  }
});
