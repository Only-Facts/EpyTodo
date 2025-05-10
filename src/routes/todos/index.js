const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).send({
        message: 'ton deuxième père le chauve',
    });
});

module.exports = router;
