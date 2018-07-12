const express = require('express');
const router = express.Router();
const MessageContr = require('../db_controllers/MessageContoller');

router.get('/', async (req, res) => {
  const messages = await MessageContr.getAll();
  res.send(messages);
});

router.get('/:id', async (req, res) => {
  const messages = await MessageContr.getOneByID(req.params.id);
  res.send(messages);
});

router.get('/:id/receivers', async (req, res) => {
  const user = await MessageContr.getUserReceiversByID(req.params.id); 
  res.send(user);
});

router.post('/', async (req, res) => {
  const newMessage = {
    senderID: req.body.senderID,
    receiverID: req.body.receiverID,
    body: req.body.body
  };
  const response = await MessageContr.insert(newMessage);
  res.send(response);
});

router.put('/:id', async (req, res) => {
  const newMessage = {
    senderID: req.body.senderID,
    receiverID: req.body.receiverID,
    body: req.body.body
  };
  const response = await MessageContr.update(req.params.id, newMessage);
  res.send(response);
});

router.delete('/:id', async (req, res) => {
  const response = await MessageContr.remove(req.params.id);
  res.send(response);
});

module.exports = router;
