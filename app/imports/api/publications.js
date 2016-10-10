import { Meteor } from 'meteor/meteor';
import { Guests } from './guests.js';

if (Meteor.isServer) {
  Meteor.publish('guests', () => {
    return Guests.find();
  });
}
