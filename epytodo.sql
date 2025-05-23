CREATE DATABASE IF NOT EXISTS epytodo;
USE epytodo;

CREATE TABLE IF NOT EXISTS user (
    id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    firstname VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    UNIQUE (email)
);

CREATE TABLE IF NOT EXISTS todo (
    id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY NOT NULL,
    title VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    due_time TIMESTAMP NOT NULL,
    user_id INTEGER UNSIGNED NOT NULL,
    FOREIGN KEY (user_id) REFERENCES user (id),
    status VARCHAR(255) DEFAULT 'not started'
);
