const express = require('express');
const router = express.Router();
const {
  addUser,
  getUser,
  hash
} = require('./../../config/db.mjs');
const jwt = require('jsonwebtoken');

router.post('/register', async (req, res) => {
  const { email, name, firstname, password } = req.body;
  try {
    await addUser(email, password, name, firstname)
    const user = await getUser(email);
    const token = jwt.sign({ "email": email, "password": await hash(password), "id": user.id }, process.env.SECRET)
    res.status(201).send({ "token": token })
  } catch (error) {
    console.error(`${error}`);
    if (error == `Error: Duplicate entry '${email}' for key 'email'`)
      res.status(200).send({ "msg": "Account already exists" });
    else
      res.status(400).json({ "msg": "Bad parameter" })
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUser(email);
    if (user == undefined) {
      return res.status(400).json({ "msg": "Invalid Credentials" })
    }
    if (await hash(password) == user.password) {
      const token = jwt.sign({ "email": email, "password": await hash(password), "id": user.id }, process.env.SECRET);
      res.status(200).json({ "token": token });
    } else {
      res.status(400).json({ "msg": "Invalid Credentials" })
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ "msg": "Bad parameter" })
  }
});

module.exports = router;
