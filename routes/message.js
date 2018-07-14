const express = require('express');
const router = express.Router();
const MessageRepository = require('../repositories/MessageRepository');

router.get('/', async (req, res) => {
  const messages = await MessageRepository.getAll();
  res.send(messages);
});

router.get('/:id', async (req, res) => {
  const messages = await MessageRepository.getOneByID(req.params.id);
  res.send(messages);
});

router.get('/:id/receivers', async (req, res) => {
  const receivers = await MessageRepository.getUserReceiversByID(req.params.id);
  res.send(receivers);
});

router.post('/', async (req, res) => {
  const newMessage = {
    senderID: req.body.senderID,
    receiverID: req.body.receiverID,
    body: req.body.body
  };
  const response = await MessageRepository.insert(newMessage);
  res.send(response);
});

router.put('/:id', async (req, res) => {
  const newMessage = {
    senderID: req.body.senderID,
    receiverID: req.body.receiverID,
    body: req.body.body
  };
  const response = await MessageRepository.update(req.params.id, newMessage);
  res.send(response);
});

router.delete('/:id', async (req, res) => {
  const response = await MessageRepository.removeByID(req.params.id);
  res.send(response);
});

module.exports = router;
