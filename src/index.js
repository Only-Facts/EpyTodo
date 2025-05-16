const auth = require('./routes/auth/');
const user = require('./routes/user');
const users = require('./routes/users');
const todos = require('./routes/todos');

const express = require('express');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());

require('dotenv').config();
const IP = process.env.MYSQL_HOST
const PORT = process.env.PORT || 8080;

app.get('/', (_, res) => {
  res.status(200).send({
    message: 'Welcome to EpyTodo',
  });
});

app.use('/', auth);
app.use('/user', user);
app.use('/users', users);
app.use('/todos', todos);

app.use((err, req, res, _) => {
  console.error(err.stack);
  res.status(500).json({ "msg": "Internal server error" });
})

app.listen(PORT, () => {
  console.log(`Listening address http://${IP}:${PORT}`);
});
