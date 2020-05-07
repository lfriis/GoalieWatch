var mongoose = require('mongoose');

const emailDevsSchema = new mongoose.Schema(
    {
      email:
      {
        type: String,
        required: true,
        trim: true,
        minlength: 3 
      },
      subject:  
      {
        type: String,
        required: true,
      },
      body:
      {
        type: String,
        required: true,
      },
      status:
      {
        type: String,
        default: "Submitted"
      }
    }, {
      timestamps: true,
    });
  
  const emailDevs = mongoose.model('EmailDevs', emailDevsSchema);
  
  module.exports = emailDevs;
  