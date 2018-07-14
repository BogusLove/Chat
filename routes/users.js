const express = require('express');
const router = express.Router();
const UserRepository = require('../repositories/UserRepository');

router.get('/', async (req, res) => {
  const users = await UserRepository.getAll(); 
  res.send(users);
});

router.get('/:id', async (req, res) => {
  const user = await UserRepository.getOneByID(req.params.id); 
  res.send(user);
});

router.post('/', async (req, res) => {
  const newUser = {
    full_name: req.body.full_name,
    email: req.body.email
  };
  const response = await UserRepository.insert(newUser); 
  res.send(response);
});

router.put('/:id', async (req, res) => {
  const newUser = {
    full_name: req.body.full_name,
    email: req.body.email
  };
  const response = await UserRepository.update(req.params.id, newUser); 
  res.send(response);
});

router.delete('/:id', async (req, res) => {
  const response = await UserRepository.removeByID(req.params.id);
  res.send(response);
});

module.exports = router;
