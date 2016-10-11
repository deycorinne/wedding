var require = meteorInstall({"client":{"template.main.js":function(){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// client/template.main.js                                                          //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
                                                                                    // 1
Template.body.addContent((function() {                                              // 2
  var view = this;                                                                  // 3
  return HTML.Raw('<div id="render-target"></div>');                                // 4
}));                                                                                // 5
Meteor.startup(Template.body.renderToDocument);                                     // 6
                                                                                    // 7
//////////////////////////////////////////////////////////////////////////////////////

},"main.js":["react","meteor/meteor","react-dom","../imports/ui/landing.js",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// client/main.js                                                                   //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
var React;module.import('react',{"default":function(v){React=v}});var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var render;module.import('react-dom',{"render":function(v){render=v}});var App;module.import('../imports/ui/landing.js',{"default":function(v){App=v}});
                                                                                    // 2
                                                                                    // 3
                                                                                    //
                                                                                    // 5
                                                                                    //
Meteor.startup(function () {                                                        // 7
  render(React.createElement(App, null), document.getElementById('render-target'));
});                                                                                 // 9
//////////////////////////////////////////////////////////////////////////////////////

}]},"imports":{"api":{"guests.js":["meteor/meteor","meteor/mongo","meteor/check",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// imports/api/guests.js                                                            //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
module.export({Guests:function(){return Guests}});var Meteor;module.import('meteor/meteor',{"Meteor":function(v){Meteor=v}});var Mongo;module.import('meteor/mongo',{"Mongo":function(v){Mongo=v}});var check;module.import('meteor/check',{"check":function(v){check=v}});
                                                                                    // 2
                                                                                    // 3
                                                                                    //
var Guests = new Mongo.Collection('guests');                                        // 5
                                                                                    //
if (Meteor.isServer) {                                                              // 7
  // This code only runs on the server                                              //
  // Only publish guests that are public or belong to the current user              //
  Meteor.publish('guests', function () {                                            // 10
    function guestsPublication() {                                                  // 10
      return Guests.find({                                                          // 11
        $or: [{ 'private': { $ne: true } }, { owner: this.userId }]                 // 12
      });                                                                           // 11
    }                                                                               // 17
                                                                                    //
    return guestsPublication;                                                       // 10
  }());                                                                             // 10
}                                                                                   // 18
                                                                                    //
Meteor.methods({                                                                    // 20
  'guests.insert': function () {                                                    // 21
    function guestsInsert(text) {                                                   // 20
      check(text, String);                                                          // 22
                                                                                    //
      // Make sure the user is logged in before inserting a guest                   //
      if (!this.userId) {                                                           // 25
        throw new Meteor.Error('not-authorized');                                   // 26
      }                                                                             // 27
                                                                                    //
      Guests.insert({                                                               // 29
        text: text,                                                                 // 30
        createdAt: new Date(),                                                      // 31
        owner: this.userId,                                                         // 32
        username: Meteor.users.findOne(this.userId).username                        // 33
      });                                                                           // 29
    }                                                                               // 35
                                                                                    //
    return guestsInsert;                                                            // 20
  }(),                                                                              // 20
  'guests.remove': function () {                                                    // 36
    function guestsRemove(guestId) {                                                // 20
      check(guestId, String);                                                       // 37
                                                                                    //
      var guest = Guests.findOne(guestId);                                          // 39
      if (guest['private'] && guest.owner !== this.userId) {                        // 40
        // If the guest is private, make sure only the owner can delete it          //
        throw new Meteor.Error('not-authorized');                                   // 42
      }                                                                             // 43
                                                                                    //
      Guests.remove(guestId);                                                       // 45
    }                                                                               // 46
                                                                                    //
    return guestsRemove;                                                            // 20
  }(),                                                                              // 20
  'guests.setChecked': function () {                                                // 47
    function guestsSetChecked(guestId, setChecked) {                                // 20
      check(guestId, String);                                                       // 48
      check(setChecked, Boolean);                                                   // 49
                                                                                    //
      var guest = Guests.findOne(guestId);                                          // 51
      if (guest['private'] && guest.owner !== this.userId) {                        // 52
        // If the guest is private, make sure only the owner can check it off       //
        throw new Meteor.Error('not-authorized');                                   // 54
      }                                                                             // 55
                                                                                    //
      Guests.update(guestId, { $set: { checked: setChecked } });                    // 57
    }                                                                               // 58
                                                                                    //
    return guestsSetChecked;                                                        // 20
  }(),                                                                              // 20
  'guests.setPrivate': function () {                                                // 59
    function guestsSetPrivate(guestId, setToPrivate) {                              // 20
      check(guestId, String);                                                       // 60
      check(setToPrivate, Boolean);                                                 // 61
                                                                                    //
      var guest = Guests.findOne(guestId);                                          // 63
                                                                                    //
      // Make sure only the guest owner can make a guest private                    //
      if (guest.owner !== this.userId) {                                            // 66
        throw new Meteor.Error('not-authorized');                                   // 67
      }                                                                             // 68
                                                                                    //
      Guests.update(guestId, { $set: { 'private': setToPrivate } });                // 70
    }                                                                               // 71
                                                                                    //
    return guestsSetPrivate;                                                        // 20
  }()                                                                               // 20
});                                                                                 // 20
//////////////////////////////////////////////////////////////////////////////////////

}]},"ui":{"guest.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","react",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// imports/ui/guest.js                                                              //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
var _classCallCheck;module.import('babel-runtime/helpers/classCallCheck',{"default":function(v){_classCallCheck=v}});var _possibleConstructorReturn;module.import('babel-runtime/helpers/possibleConstructorReturn',{"default":function(v){_possibleConstructorReturn=v}});var _inherits;module.import('babel-runtime/helpers/inherits',{"default":function(v){_inherits=v}});var React,Component,PropTypes;module.import('react',{"default":function(v){React=v},"Component":function(v){Component=v},"PropTypes":function(v){PropTypes=v}});
                                                                                    //
                                                                                    //
                                                                                    // 1
                                                                                    //
// Guest component - represents a single todo item                                  //
                                                                                    //
var Guest = function (_Component) {                                                 //
  _inherits(Guest, _Component);                                                     //
                                                                                    //
  function Guest() {                                                                //
    _classCallCheck(this, Guest);                                                   //
                                                                                    //
    return _possibleConstructorReturn(this, _Component.apply(this, arguments));     //
  }                                                                                 //
                                                                                    //
  Guest.prototype.render = function () {                                            //
    function render() {                                                             //
      var guest = this.props.guest;                                                 // 7
      return React.createElement(                                                   // 8
        'li',                                                                       // 9
        null,                                                                       // 9
        guest.firstName,                                                            // 9
        ' ',                                                                        // 9
        guest.lastName                                                              // 9
      );                                                                            // 9
    }                                                                               // 11
                                                                                    //
    return render;                                                                  //
  }();                                                                              //
                                                                                    //
  return Guest;                                                                     //
}(Component);                                                                       //
                                                                                    //
module.export("default",exports.default=(Guest));                                   //
                                                                                    //
                                                                                    //
Guest.propTypes = {                                                                 // 14
  guest: PropTypes.object.isRequired                                                // 15
};                                                                                  // 14
//////////////////////////////////////////////////////////////////////////////////////

}],"landing.js":["babel-runtime/helpers/classCallCheck","babel-runtime/helpers/possibleConstructorReturn","babel-runtime/helpers/inherits","react","react-dom","meteor/react-meteor-data","../api/guests.js","./guest.js",function(require,exports,module){

//////////////////////////////////////////////////////////////////////////////////////
//                                                                                  //
// imports/ui/landing.js                                                            //
//                                                                                  //
//////////////////////////////////////////////////////////////////////////////////////
                                                                                    //
var _classCallCheck;module.import('babel-runtime/helpers/classCallCheck',{"default":function(v){_classCallCheck=v}});var _possibleConstructorReturn;module.import('babel-runtime/helpers/possibleConstructorReturn',{"default":function(v){_possibleConstructorReturn=v}});var _inherits;module.import('babel-runtime/helpers/inherits',{"default":function(v){_inherits=v}});var React,Component,PropTypes;module.import('react',{"default":function(v){React=v},"Component":function(v){Component=v},"PropTypes":function(v){PropTypes=v}});var ReactDOM;module.import('react-dom',{"default":function(v){ReactDOM=v}});var createContainer;module.import('meteor/react-meteor-data',{"createContainer":function(v){createContainer=v}});var Guests;module.import('../api/guests.js',{"Guests":function(v){Guests=v}});var Guest;module.import('./guest.js',{"default":function(v){Guest=v}});
                                                                                    //
                                                                                    //
                                                                                    // 1
                                                                                    // 2
                                                                                    // 3
                                                                                    // 4
                                                                                    //
                                                                                    // 6
                                                                                    //
// App component - represents the whole app                                         //
                                                                                    //
var App = function (_Component) {                                                   //
  _inherits(App, _Component);                                                       //
                                                                                    //
  function App() {                                                                  //
    _classCallCheck(this, App);                                                     //
                                                                                    //
    return _possibleConstructorReturn(this, _Component.apply(this, arguments));     //
  }                                                                                 //
                                                                                    //
  App.prototype.handleSubmit = function () {                                        //
    function handleSubmit(event) {                                                  //
      event.preventDefault();                                                       // 11
                                                                                    //
      // Find the text field via the React ref                                      //
      var text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();            // 14
                                                                                    //
      Guests.insert({                                                               // 16
        text: text,                                                                 // 17
        createdAt: new Date() });                                                   // 18
                                                                                    //
      // Clear form                                                                 //
      // current time                                                               //
      ReactDOM.findDOMNode(this.refs.textInput).value = '';                         // 22
    }                                                                               // 23
                                                                                    //
    return handleSubmit;                                                            //
  }();                                                                              //
                                                                                    //
  App.prototype.renderGuests = function () {                                        //
    function renderGuests() {                                                       //
      console.log(this.props);                                                      // 26
      return this.props.guests.map(function (guest) {                               // 27
        return React.createElement(Guest, { key: guest._id, guest: guest });        // 27
      });                                                                           // 27
    }                                                                               // 30
                                                                                    //
    return renderGuests;                                                            //
  }();                                                                              //
                                                                                    //
  App.prototype.render = function () {                                              //
    function render() {                                                             //
      return React.createElement(                                                   // 33
        'div',                                                                      // 34
        { className: 'container' },                                                 // 34
        React.createElement(                                                        // 35
          'header',                                                                 // 35
          null,                                                                     // 35
          React.createElement(                                                      // 36
            'h1',                                                                   // 36
            null,                                                                   // 36
            'Guest List'                                                            // 36
          ),                                                                        // 36
          React.createElement(                                                      // 38
            'form',                                                                 // 38
            { className: 'new-guest', onSubmit: this.handleSubmit.bind(this) },     // 38
            React.createElement('input', {                                          // 39
              type: 'text',                                                         // 40
              ref: 'textInput',                                                     // 41
              placeholder: 'Type to add new guests'                                 // 42
            })                                                                      // 39
          )                                                                         // 38
        ),                                                                          // 35
        React.createElement(                                                        // 47
          'ul',                                                                     // 47
          null,                                                                     // 47
          this.renderGuests()                                                       // 48
        )                                                                           // 47
      );                                                                            // 34
    }                                                                               // 52
                                                                                    //
    return render;                                                                  //
  }();                                                                              //
                                                                                    //
  return App;                                                                       //
}(Component);                                                                       //
                                                                                    //
App.propTypes = {                                                                   // 55
  guests: PropTypes.array.isRequired                                                // 56
};                                                                                  // 55
                                                                                    //
module.export("default",exports.default=(createContainer(function () {              // 59
  return {                                                                          // 60
    guests: Guests.find({}, { sort: { createdAt: -1 } }).fetch()                    // 61
  };                                                                                // 60
}, App)));                                                                          // 63
//////////////////////////////////////////////////////////////////////////////////////

}]}}},{"extensions":[".js",".json",".html",".css"]});
require("./client/template.main.js");
require("./client/main.js");