var express = require('express');
var router = express.Router();

const Model = require('../models/orders');

/* GET users listing. */
router.get('/all', async (req, res, next) => {
  const orders = await Model.find()
  res.status(200).json(orders)
});

router.post('/add', async (req, res, next) => {
  const order = await Model.create(req.body)
  res.status(201).json(order);
})
module.exports = router;
