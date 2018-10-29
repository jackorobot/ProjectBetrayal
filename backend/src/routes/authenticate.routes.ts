import { authenticate } from '../services/user.service';
import { Router } from 'express';

export const authenticateRouter = Router()

authenticateRouter.route('/')
  // Get auth request
  .post((req, res) => {
    authenticate(req.body.username, req.body.password)
      .then((user) => {
        if (user) {
          // Auth succesful
          res.send(user);
        } else {
          res.status(400).send('Username or password is incorrect');
        }
      })
      .catch((err) => {
        res.status(400).send(err);
      });
  });
