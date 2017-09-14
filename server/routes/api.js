const express = require('express');
const router = express.Router();

var TeamRoutes = require('./team.routes');
var CellRoutes = require('./cell.routes');
var ActionRoutes = require('./action.routes');
var GenerateRoutes = require('./generate.routes');

//Get API listing
router.get('/', (req, res) => {
  res.send('{ message : "API Works" }');
});

router.use('/teams', TeamRoutes);
router.use('/cells', CellRoutes);
router.use('/actions', ActionRoutes);
router.use('/generate', GenerateRoutes);

module.exports = router;