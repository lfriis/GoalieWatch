var mongoose = require('mongoose');

var goalieSchema = new mongoose.Schema(
  {
    team_id:  
    {
      type: String,
      required: true,
    },
    team_name:
    {
      type: String,
      required: true
    },
    goalie_name:    
    {
      type: String,
      required: true
    },
    goalie_id:
    {
      type: String,
      required: true,
    },
    jersey_number:
    {
      type: String,
      required: true,
    },
    player_link:
    {
      type: String,
      required: true,
    },
  });

const goalie_model = mongoose.model('goalie', goalieSchema);

module.exports = goalie_model;
