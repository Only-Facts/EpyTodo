import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

export const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_ROOT_PASSWORD,
  database: process.env.MYSQL_DATABASE
}).promise()

export async function hash(password) {
  let hashed = 0;

  if (password.length == 0) return hashed;
  for (let i = 0; i < password.length; i++) {
    hashed = ((hashed << 5) - hashed) + password.charCodeAt(i);
    hashed &= hashed;
  }
  if (hashed < 0) hashed *= -1;
  return hashed;
}

export async function getUsers() {
  const [rows] = await pool.query(`
        SELECT *
        FROM user
    `);
  return rows;
}

export async function getTodos() {
  const [rows] = await pool.query(`
        SELECT *
        FROM todo
    `);
  return rows;
}

export async function getUser(value) {
  let [rows] = await pool.query(`
        SELECT *
        FROM user
        WHERE id = ?
    `, [value]);
  if (rows.length > 0) {
    return rows[0];
  }
  [rows] = await pool.query(`
        SELECT *
        FROM user
        WHERE email = ?
      `, [value]);
  return rows[0];
}

export async function getTodo(id) {
  const [rows] = await pool.query(`
        SELECT *
        FROM todo
        WHERE id = ?
    `, [id])
  return rows[0]
}

export async function getUserTodo(id) {
  console.log(id);
  const [rows] = await pool.query(`
      SELECT *
      FROM todo
      WHERE user_id = ?
  `, [id]);
  return rows;
}

export async function addUser(email, password, name, firstname) {
  const hashed_pass = await hash(password);
  const [rows] = await pool.query(`
        INSERT INTO user (email, password, name, firstname)
        VALUES (?, ?, ?, ?)
    `, [email, hashed_pass, name, firstname]);
  return getUser(rows.insertId);
}

export async function addTodo(title, description, due_time, user_id, status) {
  let rows = 0;

  if (!due_time || !user_id)
    return -1;
  if (!status) {
    [rows] = await pool.query(`
            INSERT INTO todo (title, description, due_time, user_id)
            VALUES (?, ?, ?, ?)
        `, [title, description, due_time, user_id]);
  } else {
    [rows] = await pool.query(`
            INSERT INTO todo (title, description, due_time, user_id, status)
            VALUES (?, ?, ?, ?, ?)
        `, [title, description, due_time, user_id, status]);
  }
  return getTodo(rows.insertId);
}

export async function updateUser(id, email, password, name, firstname) {
  const [rows] = await pool.query(`
    UPDATE \`user\`
    SET email = ?, password = ?, firstname = ?, name = ?
    WHERE id = ?
  `, [email, password, firstname, name, id]);
  return rows[0];
}

export async function updateTodo(id, title, description, due_time, user_id, status) {
  const [rows] = await pool.query(`
    UPDATE \`todo\`
    SET title = ?, description = ?, due_time = ?, user_id = ?, status = ?
    WHERE id = ?
  `, [title, description, due_time, user_id, status, id]);
  return rows[0];
}

export async function deleteUser(id) {
  try {
    await pool.query(`
            DELETE FROM user
            WHERE id = ?
        `, [id]);
    return 0;
  } catch (error) {
    return error;
  }
}

export async function deleteTodo(id) {
  try {
    await pool.query(`
            DELETE FROM todo
            WHERE id = ?
        `, [id]);
    return 0;
  } catch (error) {
    return error;
  }
}
