import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
import { Class } from 'meteor/jagi:astronomy';

const Guests = new Mongo.Collection('guests');
const Guest = Class.create({
  name: 'Guest',
  collection: Guests,
  fields: {
    firstName: {
      type: String,
      validators: [{
        type: 'minLength',
        param: 1
      }]
    },
    lastName: {
      type: String,
      validators: [{
        type: 'minLength',
        param: 1
      }]
    },
    email: {
      type: String,
      validators: [{
        type: 'email'
      }]
    },
    attending: {
      type: Boolean
    },
    invited: {
      type: Boolean
    }
  },
  behaviors: {}
});
