const user = require('./routes/user');
const users = require('./routes/users');
const todos = require('./routes/todos');

const express = require('express');
const app = express();
app.use(express.json());

require('dotenv').config();
const IP = process.env.MYSQL_HOST
const PORT = process.env.PORT || 8080;

const { addUser } = require('./config/db.mjs');

app.get('/', (req, res) => {
    res.status(200).send({
        message: 'Welcome to EpyTodo',
    });
});

app.post('/register', async (req, res) => {
    const { email, name, firstname, password } = req.body;
    try {
        const user = await addUser(email, password, name, firstname)
        res.status(201).send({ "token": "Token of the newly registered user" })
    } catch (error) {
        console.error(`${error}`);
        if (error == `Error: Duplicate entry '${email}' for key 'email'`)
            res.status(200).send({ "msg": "Account already exists" });
        else
            res.status(400).json({ "msg": "Bad parameter" })
    }
});

app.post('/login', (req, res) => {
    res.status(201).json({
        message: 'connect a user',
    });
});

app.use('/user', user);
app.use('/users', users);
app.use('/todos', todos);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ "msg": "Internal server error" });
})

app.listen(PORT, () => {
    console.log(`Listening address http://${IP}:${PORT}`);
});
