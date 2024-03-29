var mongoose = require('../mongoose');
var bcrypt = require('bcrypt');
var md5 = require('MD5');
var textSearch = require('mongoose-text-search');
var mongooseValidator = require('mongoose-validator');
var _ = require('lodash');

var User = new mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: true,
    index: {
      unique: true
    }
  },
  username: {
    type: String,
    lowercase: true,
    trim: true,
    require: true,
    index: {
      unique: true
    },
    validate: mongooseValidator({
      validator: 'isAlphanumeric',
      passIfEmpty: false,
      message: "Username can only be alpha-numeric"
    })
  },
  first_name: {
    type: String,
    trim: true
  },
  last_name: {
    type: String,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
});

User.plugin(textSearch);
User.index({username: 'text'});

User.pre('save', function(next) {
  var self = this;

  if (!this.isModified('password')) return next();

  bcrypt.genSalt(10, function(err, salt) {
    if (err) return next(err);

    bcrypt.hash(self.password, salt, function(err, hash) {
      if (err) return next(err);

      self.password = hash;
      next();
    });
  });
});

User.methods.authenticate = function(password, cb) {
  bcrypt.compare(password, this.password, function(err, match) {
    if (err) return cb(err);
    cb(null, match);
  });
}

User.methods.updateInfo = function(fields, cb) {
  var self = this;

  var updatableFields = [
    "first_name",
    "last_name"
  ];

  fields = _.pick(fields, updatableFields);
  _.each(fields, function(value, field) {
    self[field] = value;
  });

  self.save(cb);
}

User.statics.searchForUser = function(input, cb) {
  this.find({
    "username": new RegExp(".*"+input+".*")
  }, cb);
}

User.method('toJSON', function() {
  var user = this.toObject({virtuals: true});
  delete user.password;
  return user;
});

User.virtual('gravatar').get(function() {
  return 'https://www.gravatar.com/avatar/' + md5(this.email) + '.jpg';
});

User.virtual('name').get(function() {
  return this.first_name + " " + this.last_name;
});

module.exports = mongoose.model('User', User);