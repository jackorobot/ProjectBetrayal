var express = require('express');
var router = express.Router();

var userService = require('../services/user.service');

router.route('/')
// Get auth request
.post((req, res) => {
  userService.authenticate(req.body.username, req.body.password)
    .then(function (user) {
      if (user) {
        // Auth succesful
        res.send(user);
      } else {
        res.status(400).send('Username or password is incorrect');
      }
    })
    .catch(function (err){
      res.status(400).send(err);
    })
})

.get((req, res) => {
  res.json({message: "Nothing here"});
});

module.exports = router;