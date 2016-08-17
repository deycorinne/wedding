import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';

export const Guests = new Mongo.Collection('guests');

if (Meteor.isServer) {
  // This code only runs on the server
  // Only publish guests that are public or belong to the current user
  Meteor.publish('guests', function guestsPublication() {
    return Guests.find({
      $or: [
        { private: { $ne: true } },
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'guests.insert'(text) {
    check(text, String);

    // Make sure the user is logged in before inserting a guest
    if (! this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Guests.insert({
      text,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username,
    });
  },
  'guests.remove'(guestId) {
    check(guestId, String);

    const guest = Guests.findOne(guestId);
    if (guest.private && guest.owner !== this.userId) {
      // If the guest is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Guests.remove(guestId);
  },
  'guests.setChecked'(guestId, setChecked) {
    check(guestId, String);
    check(setChecked, Boolean);

    const guest = Guests.findOne(guestId);
    if (guest.private && guest.owner !== this.userId) {
      // If the guest is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }

    Guests.update(guestId, { $set: { checked: setChecked } });
  },
  'guests.setPrivate'(guestId, setToPrivate) {
    check(guestId, String);
    check(setToPrivate, Boolean);

    const guest = Guests.findOne(guestId);

    // Make sure only the guest owner can make a guest private
    if (guest.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    Guests.update(guestId, { $set: { private: setToPrivate } });
  },
});
