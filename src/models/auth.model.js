const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const authSchema = mongoose.Schema(
  {
    username: {
      type: String,
      lowercase: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      trim: true,
      default: '',
    },
    user: {
      type: mongoose.SchemaTypes.ObjectId,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

authSchema.index({ username: 1 });

authSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

authSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcrypt.compare(password, user.password);
};

module.exports = mongoose.model('Auth', authSchema);
