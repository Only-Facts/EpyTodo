const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');
const check_id = require('../../middleware/notFound.js');

const {
  getTodos,
  getTodo,
  addTodo,
  updateTodo,
  deleteTodo
} = require('../../config/db.mjs');
const { use } = require('../auth/index.js');

router.get('/', auth, async (_, res) => {
  const todos = await getTodos();

  res.status(200).json(todos);
});

router.get('/:id', auth, check_id, async (req, res) => {
  const id = req.params.id;
  const todo = await getTodo(id);

  if (todo == undefined)
    res.status(400).send({ "msg": "Not found" });
  else
    res.status(200).json(todo);
});

router.post('/', auth, async (req, res) => {
  const { title, description, due_time, user_id, status } = req.body;
  try {
    const todo = await addTodo(title, description, due_time, user_id, status)
    if (todo == -1)
      res.status(400).json({ "msg": "Bad parameter" });
    else
      res.status(201).send(todo);
  } catch (error) {
    console.log(`${error}`);
    res.status(400).json({ "msg": "Bad parameter" })
  }
});

router.put('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const { title, description, due_time, user_id, status } = req.body;

  if (!title || !description || !due_time || !user_id || !status) {
    return res.status(400).json({ "msg": "Bad parameter" });
  }
  await updateTodo(id, title, description, due_time, user_id, status);
  const todo = await getTodo(id);
  res.status(200).json(todo);
})

router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const result = await getTodo(id);

  if (result != undefined) {
    await deleteTodo(id);
    res.status(200).json({ "msg": `Successfully deleted record number: ${id}` });
  } else
    res.status(400).send({ "msg": "Not found" });
});

module.exports = router;
