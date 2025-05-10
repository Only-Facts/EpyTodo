const express = require('express');
const router = express.Router();

const { getUsers } = require('../../config/db.mjs');

router.get('/', async (req, res) => {
    const users = await getUsers()
    res.status(200).json(users)
});

router.get('/todos', (req, res) => {
    res.status(200).json({
        message: 'view all user tasks',
    });
});

module.exports = router;
