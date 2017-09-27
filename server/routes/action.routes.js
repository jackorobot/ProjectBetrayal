const express = require('express');
const router = express.Router();

var Action = require('../models/action.model');

router.route('/')
/**
* Request all actions
*/  
.get( (req, res) => {
  Action.find({}, function(err, actions){
    if(err) res.send(err);
    else res.json(actions);
  });
})
.put( (req, res) => {
  var newAction = new Action();

  if (req.body.origin) newAction.origin = req.body.origin;
  if (req.body.target) newAction.target = req.body.target;
  if (req.body.actionType) newAction.actionType = req.body.actionType;
  if (req.body.team) newAction.team = req.body.team;

  newAction.save(function(err) {
    if (err) res.send(err);
    else res.send(newAction);
  });
});

router.route('/owner/:owner_id')
// Get all actions according to the cell ownerid
.get((req, res) => {
  Action.find()
    .populate({
      path: 'origin',
      $match: { owner: req.params.owner_id },
      select: 'name neighbours owner',
      populate: {
        path: 'neighbours',
        select: 'name'
      },
    }).exec(function(err, actions) {
      if (err) res.json(err);
      else res.json(actions);
    });
});

router.route('/:action_id')
/**
 * Get a single action by id
 */
.get( (req, res) => {
  Action.findById(req.params.action_id, function(err, action) {
    if(err) res.send(err);
    else res.json(action);
  });
})
/**
 * Update action info
 */
.put( (req, res) => {
  Action.findById(req.params.action_id, function(err, action){
    if (err) res.send(err);
    
    if (req.body.origin) action.origin = req.body.origin;
    if (req.body.target) action.target = req.body.target;
    if (req.body.actionType) action.actionType = req.body.actionType;
    if (req.body.team) action.team = req.body.team;

    action.save(function(err){
      if (err) res.send(err);
      else res.json(action);
    });
  });
})
/**
 * Delete a action
 */
.delete( (req, res) => {
  Action.remove({
    _id: req.params.action_id
  }, function(err, action) {
    if (err) res.send(err);
    else res.json({ message: 'Action deleted'});
  });
});

module.exports = router;