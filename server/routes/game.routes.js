const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');
var Cell = require('../models/cell.model');
var Action = require('../models/action.model');

function newRound(res){
  Cell.find({}, (err, cells) => {
    var actions = [];
    cells.forEach(function (cell) {
      var newAction = new Action();
      newAction.origin = cell._id;
      newAction.target = cell._id;
      newAction.actionType = 'defend';
      newAction.team = cell.owner;

      actions.push(newAction);
    });

    Action.create(actions, function(err){
      if (err) res.send(err);
      else res.json({message: 'Done'});
    });
  });
}

function executeRound(){

}

function clearRound(){
  Action.remove({}, function(err){
    if (err) return err;
  })
}

router.route('/newround')
// Generate a new route
.get((req, res) => {
  newRound(res);
});

module.exports = router;