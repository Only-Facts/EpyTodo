const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');

const { getUser, getUserTodo } = require('../../config/db.mjs');

router.get('/', auth, async (req, res) => {
  if (req.user) {
    const users = await getUser(req.user);

    res.status(200).json(users);
  } else {
    res.status(500).json({ "msg": "No token, authorization denied" })
  }
});

router.get('/todos', auth, async (req, res) => {
  if (req.user) {
    const user = await getUser(req.user)
    const tables = await getUserTodo(user.id);

    res.status(200).json(tables);
  } else {
    res.status(500).json({ "msg": "No token, authorization denied" })
  }
});

module.exports = router;
