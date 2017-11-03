const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');

var Cell = require('../models/cell.model');

var ObjectId = mongoose.Types.ObjectId;

router.route('/')
/**
* Request all cells
*/  
.get( (req, res) => {
  Cell.find({}, function(err, cells){
    if(err) res.send(err);
    else res.json(cells);
  });
})
/**
 * Add a cell
 */
.put( (req, res) => {
  var newCell = new Cell();

  if (req.body.name) newCell.name = req.body.name;
  if (req.body.owner) newCell.owner = req.body.owner;
  if (req.body.neighbours) newCell.neighbours = req.body.neighbours;
  if (req.body.target) newCell.target = req.body.target;
  if (req.body.actionType) newCell.actionType = req.body.actionType;
  if (req.body.team) newCell.team = req.body.team;

  newCell.save(function(err) {
    if (err) res.send(err);
    else res.json({ message: 'Cell added succesfully!'});
  });
})
/**
 * Delete all cells
 */
.delete((req, res) => {
   Cell.remove({}, function(err, cell){
    if (err) res.send(err);
    else res.json({ message: 'Cells deleted'});
   });
});

router.route('/populate')
// Get all cells, but populated
.get( (req, res) => {
  Cell.find({}).
  populate(['owner', 'neighbours'])
  .exec(function(err, cells){
    if(err) res.send(err);
    else res.json(cells);
  });
});

router.route('/owner/:owner_id')
// Get all cells for a given owner
.get((req, res) => {
  Cell.find({'owner': new ObjectId(req.params.owner_id)})
    .populate(['owner', 'neighbours', 'target'])
    .exec(function(err, cells) {
    if(err) res.send(err);
    else res.json(cells);
  });
});

router.route('/:cell_id')
/**
 * Get a single cell by id
 */
.get( (req, res) => {
  Cell.findById(req.params.cell_id, function(err, cell) {
    if(err) res.send(err);
    else res.json(cell);
  });
})
/**
 * Update cell info
 */
.put( (req, res) => {
  Cell.findById(req.params.cell_id, function(err, cell){
    if (err) res.send(err);
    
    if (req.body.name) cell.name = req.body.name;
    if (req.body.owner) cell.owner = req.body.owner;
    if (req.body.neighbours) cell.neighbours = req.body.neighbours;
    if (req.body.target) cell.target = req.body.target;
    if (req.body.actionType) cell.actionType = req.body.actionType;
    if (req.body.team) cell.team = req.body.team;

    cell.save(function(err){
      if (err) res.send(err);
      else res.json({ message: 'Cell updated succesfully!'});
    });
  });
})
/**
 * Delete a cell
 */
.delete( (req, res) => {
  Cell.remove({
    _id: req.params.cell_id
  }, function(err, cell) {
    if (err) res.send(err);
    else res.json({ message: 'Cell deleted'});
  });
});

module.exports = router;