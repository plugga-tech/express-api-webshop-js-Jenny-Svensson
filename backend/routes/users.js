var express = require('express');
var router = express.Router();
const Model = require('../models/users');

/* GET all users */
router.get('/', async (req, res, next) => {
  try {
    const data = await Model.find().select("-password");
    res.json(data)
  }
  catch(error) {
    res.status(500).json({ message: error.message })
  }
});

/* GET specific user id. */
router.post('/', async (req, res, next) => {
  const userId = req.body.id;

  try {
    const user = await Model.findById(userId);

    if (!user) {
      return res.status(404).send('User not found');
    }

    res.json(user);

  } catch(error) {
      console.error(error);
      res.status(500).send('Server Error');
  }
})

/* POST new user. */
router.post('/add', async (req, res) => {
  const data = new Model({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      
  })


  try {
      const dataToSave = await data.save();
      res.status(200).json(dataToSave)
  }
  catch (error) {
      res.status(400).json({message: error.message})
  }
})

/* Login user */
router.post('/login', async (req, res, next) => {
  try {
    let email = req.body.email;
    let password = req.body.password;

    const data = await Model.findOne({email: email, password: password});
    res.json(data)
  }
  catch(error) {
    res.status(401).json({ message: 'Not Authorized' })

  }
});

module.exports = router;
