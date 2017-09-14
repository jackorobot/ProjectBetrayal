const express = require('express');
const router = express.Router();

var Team = require('../models/team.model');

router.route('/')
/**
* Request all teams
*/  
.get( (req, res) => {
  Team.find({}, function(err, teams){
    if(err) res.send(err);
    else res.json(teams);
  });
})
/**
 * Add a Team
 */
.put( (req, res) => {
  var newTeam = new Team();

  if (req.body.name) newTeam.name = req.body.name;
  if (req.body.color) newTeam.color = req.body.color;

  newTeam.save(function(err) {
    if (err) res.send(err);
    else res.json({ message: "New team addes succesfully!" });
  });
});

router.route('/:team_id')
/**
 * Get a single team by id
 */
.get( (req, res) => {
  Team.findById(req.params.team_id, function(err, team) {
    if(err) res.send(err);
    else res.json(team);
  });
})
/**
 * Update team info
 */
.put( (req, res) => {
  Team.findById(req.params.team_id, function(err, team){
    if (err) res.send(err);
    
    if (req.body.name) team.name = req.body.name;
    if (req.body.color) team.color = req.body.color;

    team.save(function(err){
      if (err) res.send(err);
      else res.json({ message: 'Team updated succesfully!'});
    });
  });
})
/**
 * Delete a team
 */
.delete( (req, res) => {
  Team.remove({
    _id: req.params.team_id
  }, function(err, team) {
    if (err) res.send(err);
    else res.json({ message: 'Team deleted'});
  });
});

module.exports = router;