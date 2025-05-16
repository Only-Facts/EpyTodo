const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');

const { getUsers, getTodos } = require('../../config/db.mjs');

router.get('/', auth, async (_, res) => {
  const users = await getUsers();

  res.status(200).json(users);
});

router.get('/todos', auth, async (_, res) => {
  const tables = await getTodos();

  res.status(200).json(tables);
});

module.exports = router;
