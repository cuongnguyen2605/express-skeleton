const mongoose = require('mongoose');

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
      default: '',
    },
    lastName: {
      type: String,
      trim: true,
      default: '',
    },
    phoneNumber: {
      type: String,
      trim: true,
    },
    dateOfBirth: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.index({ phoneNumber: 1 });

module.exports = mongoose.model('User', UserSchema);
