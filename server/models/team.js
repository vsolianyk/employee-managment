const _ = require('lodash');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TeamSchema = new Schema({
  name: {
    type: String,
    unique: true,
    maxlength: 200,
    required: true
  },
  description: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  parent: {
    ref: "Team",
    type: mongoose.Schema.Types.ObjectId,
    default: null
  },
  users: [
    {
      ref: "Profile",
      type: mongoose.Schema.Types.ObjectId,
      unique: true,
    }
  ],
  manager: {
    ref: "Profile",
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  teamLead: {
    ref: "Profile",
    type: mongoose.Schema.Types.ObjectId,
    default: null
  }
});

TeamSchema.pre("save", function(next) {
  this.users = _.uniq(this.users);
  next();
});

TeamSchema.post("validate", function(object, next) {
  if (
    (object.manager && !object.users.map(id => id.toString()).includes(object.manager.toString())) ||
    (object.teamLead && !object.users.map(id => id.toString()).includes(object.teamLead.toString()))
  ) {
    next(new Error({name: 'CustomError', message: 'Manager and Team lead should be present in team members'}));
  }
  next();
});

TeamSchema.virtual('usersCount').get(function() {  
  return this.users.length;
});

const TeamModel = mongoose.model("Team", TeamSchema);

module.exports = TeamModel;
