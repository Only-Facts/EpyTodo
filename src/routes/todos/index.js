const express = require('express');
const router = express.Router();

const {
  getTodos,
  getTodo,
  addTodo,
  deleteTodo
} = require('../../config/db.mjs');

router.get('/', async (_, res) => {
  const todos = await getTodos();

  res.status(200).json(todos);
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const todo = await getTodo(id);

  if (todo == undefined)
    res.status(400).send({ "msg": "Not found" });
  else
    res.status(200).json(todo);
});

router.post('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await getTodo(id);

  if (result != undefined) {
    await deleteTodo(id);
    res.status(200).json({ "msg": `Successfully deleted record number: ${id}` });
  } else
    res.status(400).send({ "msg": "Not found" });
});

module.exports = router;
