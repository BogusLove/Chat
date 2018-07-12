const express = require('express');
const router = express.Router();
const UserContr = require('../db_controllers/UserController');

router.get('/', async (req, res) => {
  const users = await UserContr.getAll(); 
  res.send(users);
});

router.get('/:id', async (req, res) => {
  const user = await UserContr.getOneByID(req.params.id); 
  res.send(user);
});

router.post('/', async (req, res) => {
  const newUser = {
    full_name: req.body.full_name,
    email: req.body.email
  };
  const response = await UserContr.insert(newUser); 
  res.send(response);
});

router.put('/:id', async (req, res) => {
  const newUser = {
    full_name: req.body.full_name,
    email: req.body.email
  };
  const response = await UserContr.update(req.params.id, newUser); 
  res.send(response);
});

router.delete('/:id', async (req, res) => {
  const response = await UserContr.removeByID(req.params.id);
  res.send(response);
});

module.exports = router;
