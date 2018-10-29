import { Router } from 'express';
import { Team } from '../models/team.model';

export const teamRouter = Router();

teamRouter.route('/')
  /**
  * Request all teams
  */
  .get((_req, res) => {
    Team.find({}, (err, teams) => {
      if (err) {
        res.send(err);
      }
      else {
        res.json(teams);
      }
    });
  })
  /**
   * Add a Team
   */
  .put((req, res) => {
    var newTeam = new Team();

    if (req.body.name) newTeam.name = req.body.name;
    if (req.body.color) newTeam.color = req.body.color;
    if (req.body.username) newTeam.username = req.body.username;
    if (req.body.password) newTeam.password = req.body.password;

    newTeam.save((err) => {
      if (err) {
        res.send(err);
      }
      else {
        res.json({ message: "New team added succesfully!" });
      }
    });
  });

teamRouter.route('/:team_id')
  /**
   * Get a single team by id
   */
  .get((req, res) => {
    Team.findById(req.params.team_id, (err, team) => {
      if (err) {
        res.send(err);
      }
      else {
        res.json(team);
      }
    });
  })
  /**
   * Update team info
   */
  .put((req, res) => {
    Team.findById(req.params.team_id, (err, team) => {
      if (err) {
        res.send(err);
      } else if (team === null) {
        res.send(new Error('The query for the requested team returned null!'))
      } else {
        if (req.body.name) team.name = req.body.name;
        if (req.body.color) team.color = req.body.color;
        if (req.body.username) team.username = req.body.username;
        if (req.body.password) team.password = req.body.password;

        team.save((err) => {
          if (err) {
            res.send(err);
          }
          else {
            res.json({ message: 'Team updated succesfully!' });
          }
        });
      }
    });
  })
  /**
   * Delete a team
   */
  .delete((req, res) => {
    Team.deleteOne({
      _id: req.params.team_id
    }, (err) => {
      if (err) {
        res.send(err);
      }
      else {
        res.json({ message: 'Team deleted' });
      }
    });
  });
