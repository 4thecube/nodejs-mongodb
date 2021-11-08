const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('From rr');
});

router.get('/users/:id', async (req, res) => {
  const id = req.params.id;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).send();
    res.status(200).send(user);
  } catch (error) {
    res.status(404).send();
  }
});

router.get('/users', async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send();
  }
});

router.patch('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!user) return res.status(404).send();
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error);
  }
});

router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send();
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
