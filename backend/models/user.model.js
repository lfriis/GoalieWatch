var mongoose = require('mongoose');

var userSchema = new mongoose.Schema(
  {
    email:
    {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3 
    },
    password:    
    {
      type: String,
      required: true,
      minlength: 6
    },
    confirmed:
    {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
  });

const User = mongoose.model('User', userSchema);

module.exports = User;