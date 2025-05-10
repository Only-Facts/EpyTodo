import mysql from 'mysql2'
import dotenv from 'dotenv'
dotenv.config();

const pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
}).promise()

async function hash(password) {
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
    const [rows] = await pool.query("SELECT * FROM user")
    return rows
}

export async function getUser(id) {
    const [rows] = await pool.query(`
        SELECT *
        FROM user
        WHERE id = ?
    `, [id])
    return rows[0]
}

export async function addUser(email, password, name, firstname) {
    const hashed_pass = await hash(password);
    const [rows] = await pool.query(`
        INSERT INTO user (email, password, name, firstname)
        VALUES (?, ?, ?, ?)
    `, [email, hashed_pass, name, firstname])
    return getUser(rows.insertId)
}

export async function deleteUser(id) {
    try {
        await pool.query(`
            DELETE FROM user
            WHERE id = ?
        `, [id]);
        return 0;
    } catch (error) {
        console.error(error);
        return -1;
    }
}
