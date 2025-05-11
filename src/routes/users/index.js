const express = require('express');
const router = express.Router();

const {
  getUser,
  deleteUser
} = require('../../config/db.mjs');

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  const user = await getUser(id);

  if (user == undefined)
    res.status(400).send({ "msg": "Not found" });
  else
    res.status(200).send(user)
});

router.put('/:id', (req, res) => {
  const id = req.id;

  res.status(200).json({
    message: `update user (id: ${id}) information`,
  });
});

router.delete('/:id', async (req, res) => {
  const id = req.params.id;
  const result = await getUser(id);

  if (result != undefined) {
    await deleteUser(id);
    res.status(200).json({ "msg": `Successfully deleted record number: ${id}` });
  } else
    res.status(400).send({ "msg": "Not found" });
});

module.exports = router;
