import * as mongoose from 'mongoose';
import { Cell } from '../models/cell.model';
import { Router } from 'express';

export const cellRouter = Router();

cellRouter.route('/')
  /**
  * Request all cells
  */
  .get((_req, res) => {
    Cell.find({}, (err, cells) => {
      if (err) {
        res.send(err);
      }
      else {
        res.json(cells);
      }
    });
  })
  /**
   * Add a cell
   */
  .put((req, res) => {
    var newCell = new Cell();

    if (req.body.name) newCell.name = req.body.name;
    if (req.body.owner) newCell.owner = req.body.owner;
    if (req.body.neighbours) newCell.neighbours = req.body.neighbours;
    if (req.body.target) newCell.target = req.body.target;
    if (req.body.actionType) newCell.actionType = req.body.actionType;
    if (req.body.team) newCell.team = req.body.team;

    newCell.save((err) => {
      if (err) {
        res.send(err);
      }
      else {
        res.json({ message: 'Cell added succesfully!' });
      }
    });
  })
  /**
   * Delete all cells
   */
  .delete((_req, res) => {
    Cell.deleteMany({}, (err) => {
      if (err) {
        res.send(err)
      }
      else {
        res.json({ message: 'Cells deleted' });
      }
    });
  });

cellRouter.route('/populate')
  // Get all cells, but populated
  .get((_req, res) => {
    Cell.find({}).
      populate(['owner', 'neighbours'])
      .exec(function (err, cells) {
        if (err) {
          res.send(err);
        }
        else {
          res.json(cells);
        }
      });
  });

cellRouter.route('/owner/:owner_id')
  // Get all cells for a given owner
  .get((req, res) => {
    Cell.find({ 'owner': new mongoose.Types.ObjectId(req.params.owner_id) })
      .populate(['owner', 'neighbours', 'target'])
      .exec((err, cells) => {
        if (err) {
          res.send(err);
        }
        else {
          res.json(cells);
        }
      });
  });

cellRouter.route('/:cell_id')
  /**
   * Get a single cell by id
   */
  .get((req, res) => {
    Cell.findById(req.params.cell_id, (err, cell) => {
      if (err) {
        res.send(err);
      }
      else {
        res.json(cell);
      }
    });
  })
  /**
   * Update cell info
   */
  .put((req, res) => {
    Cell.findById(req.params.cell_id, (err, cell) => {
      if (err) {
        res.send(err);
      } else if (cell === null) {
        res.send(new Error("Query for the cell returned null!"))
      }
      else {
        if (req.body.name) cell.name = req.body.name;
        if (req.body.owner) cell.owner = req.body.owner;
        if (req.body.neighbours) cell.neighbours = req.body.neighbours;
        if (req.body.target) cell.target = req.body.target;
        if (req.body.actionType) cell.actionType = req.body.actionType;
        if (req.body.team) cell.team = req.body.team;

        cell.save((err) => {
          if (err) {
            res.send(err);
          }
          else {
            res.json({ message: 'Cell updated succesfully!' });
          }
        });
      }
    });
  })
  /**
   * Delete a cell
   */
  .delete((req, res) => {
    Cell.deleteOne({ _id: req.params.cell_id }, (err) => {
      if (err) {
        res.send(err);
      }
      else {
        res.json({ message: 'Cell deleted' });
      }
    });
  });
