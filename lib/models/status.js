var mongoose = require('../mongoose');

var Status = new mongoose.Schema({
  _uid: {
    type: String,
    require: true
  },
  status: {
    type: String,
    enum: ["busy", "free", "none"],
    default: "none",
    require: true
  },
  details: {
    type: String
  }
});

Status.statics.getLatestForUser = function(uid, cb) {
  this.findOne({
    _uid: uid
  }).sort({_id: 'desc'}).exec(cb);
}

module.exports = mongoose.model('Status', Status);