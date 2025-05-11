const express = require('express');
const router = express.Router();

const { getUsers, getTodos } = require('../../config/db.mjs');

router.get('/', async (req, res) => {
    const users = await getUsers();
    
    res.status(200).json(users);
});

router.get('/todos', async (req, res) => {
    const tables = await getTodos();

    res.status(200).json(tables);
});

module.exports = router;
