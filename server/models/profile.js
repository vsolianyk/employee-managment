const mongoose = require('mongoose');
const _ = require('lodash');
const Schema = mongoose.Schema;

const ProfileSchema = new Schema({
  userId: {
    ref: 'User',
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
      type: String,
      required: true
  },
  lastName: {
      type: String,
      required: true
  },
  teams: [
    {
      ref: 'Team',
      type: mongoose.Schema.Types.ObjectId
    }
  ],
  hireDate: {
    type: Date,
    default: null
  },
  timeOffStartDate: {
    type: Date,
    default: null
  },
  avatarUrl: {
    type: String,
    default: null
  },
  birthDate: {
    type: Date,
    default: null
  },
  isMarried: {
    type: Boolean,
    default: false
  },
  gender: {
    type: String,
    enum: [ 'Male', 'Female', 'Other' ]
  },
  summary: {
    type: String,
    maxlength: 1000,
    default: ''
  },
  title: {
    type: String,
    default: ''
  },
  office: {
    type: String,
    enum: [ 'Silver Breeze', 'Apricot', '' ],
  },
  country: {
    type: String,
    default: 'Ukraine'
  },
  state: {
    type: String,
    default: 'Kyiv'
  },
  city: {
    type: String,
    default: 'Kyiv'
  },
  street: {
    type: String,
    default: ''
  },
  zip: {
    type: String,
    default: ''
  },
  phone: {
    type: String,
    default: ''
  },
  skype: {
    type: String,
    default: ''
  },
  skills: [
    {
      type: String
    }
  ]
});

ProfileSchema.pre('save', function (next) {
  this.skills = _.uniq(this.skills);
  this.teams = _.uniq(this.teams);
  next();
});

ProfileSchema.virtual('fullName').get(function () {  
  return this.firstName + ' ' + this.lastName;
});

const ProfileModel = mongoose.model('Profile', ProfileSchema);

module.exports = ProfileModel;