const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth.js');

const {
  getUser,
  updateUser,
  hash,
  deleteUser
} = require('../../config/db.mjs');

router.get('/:value', auth, async (req, res) => {
  const value = req.params.value;
  const user = await getUser(value);

  if (user == undefined)
    res.status(400).send({ "msg": "Not found" });
  else
    res.status(200).send(user)
});

router.put('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const { email, password, firstname, name } = req.body;

  if (!email || !password || !firstname || !name) {
    return res.status(400).json({ "msg": "Bad parameter" });
  }
  await updateUser(id, email, await hash(password), name, firstname);
  const user = await getUser(id);
  res.status(200).json(user);
});

router.delete('/:id', auth, async (req, res) => {
  const id = req.params.id;
  const result = await getUser(id);

  if (result != undefined) {
    await deleteUser(id);
    res.status(200).json({ "msg": `Successfully deleted record number: ${id}` });
  } else
    res.status(400).send({ "msg": "Not found" });
});

module.exports = router;
