var mongoose = require('mongoose');

const goalieRequestSchema = new mongoose.Schema(
  {
    email:
    {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minlength: 3 
    },
    goalie_name:  
    {
      type: [String],
      required: true,
    },
    reminder:
    {
      type: Number,
      required: true,
    }
  }, {
    timestamps: true,
  });

const GoalieRequest = mongoose.model('GoalieRequest', goalieRequestSchema);

module.exports = GoalieRequest;
