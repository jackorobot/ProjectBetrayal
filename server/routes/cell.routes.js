const express = require('express');
const router = express.Router();

var mongoose = require('mongoose');

var Cell = require('../models/cell.model');

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

  newCell.save(function(err) {
    if (err) res.send(err);
    else res.json({ message: 'Cell added succesfully!'});
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