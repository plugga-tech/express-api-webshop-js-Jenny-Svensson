var express = require('express');
var router = express.Router();
const Model = require('../models/products');

/* GET all products */
router.get('/', async (req, res, next) => {
  try {
    const data = await Model.find();
    res.json(data)
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
});

/* GET specific product id. */
router.get('/:id', async (req, res, next) => {
  try {
    const data = await Model.findById(req.params.id);
    res.json(data)
  }
  catch(error) {
    res.status(500).json({ message: error.message });
  }
})

/* POST new product. */
router.post('/add', async (req, res) => {
  const data = new Model({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      lager: req.body.lager,
      category: req.body.category
  })

  try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave)
  }
  catch (error) {
      res.status(400).json({message: error.message})
  }
})

module.exports = router;
